import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { downloadFile } from "../utils/downloadFile";
import { aleksandraTemplate } from "./templates/aleksandra";
import { TemplateDetails } from "./types";
import { libraryTemplate } from "./templates/library";
import { useAppState } from "../state/store";
import { subscribe } from "valtio";
import { arraysEqual } from "../utils/array";
import useTranslation from "next-translate/useTranslation";
import { ResumeModel } from "../models/v1";
import type {WorkerMessage} from "./worker";

// TODO: Don't import templates in regular app
export const templates: Record<string, TemplateDetails> = {
  aleksandra: aleksandraTemplate,
  library: libraryTemplate,
};

const rerender = async (worker: Worker, data: string, translate: (value: string) => string): Promise<Blob> => {
  const message: WorkerMessage = {resumeJson: data, translations: {
    contact: translate("contact"),
    phone: translate("phone"),
    email: translate("email"),
  }};
  worker.postMessage(message)
  return new Promise((res, rej) => {
    worker.onmessage = (event: MessageEvent<Blob>) => {
      res(event.data)
    }
    worker.onerror = rej;
  })
}

export const useRenderResume = (): {
  resume: Blob | null;
  download: (() => Promise<void>) | null;
  loading: boolean
} => {
  const { t } = useTranslation("app");
  const appStateProxy = useAppState();
  const stateProxy = appStateProxy.resume;

  const workerRef = useRef<Worker>();

  const [blob, setBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(true);
  const refreshPdf = useCallback((data: ResumeModel) => {
    if (!workerRef.current) {
      return;
    }

    setLoading(true);
    rerender(
      workerRef.current,
      JSON.stringify(data),
      t,
    )
      .then(setBlob)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [])

  useEffect(() => {
    workerRef.current = new Worker(new URL('./worker', import.meta.url));

    refreshPdf(appStateProxy.resume);
    return () => {
      workerRef.current?.terminate()
    }
  }, [])


  const [renderQueued, setQueued] = useState(false);
  const handle = useRef<null | ReturnType<typeof setTimeout>>();
  const previousAppearance = useRef<any[]>([]);
  useEffect(() => {
    return subscribe(stateProxy, () => {
      // Don't wait at all when appearance is changed
      const newAppearance = Object.values(stateProxy.appearance);
      if (!arraysEqual(previousAppearance.current, newAppearance)) {
        if (handle.current) {
          clearTimeout(handle.current);
          handle.current = null;
        }
        previousAppearance.current = newAppearance;
        setQueued(false);
        refreshPdf(stateProxy);
        return;
      }

      if (handle.current) {
        clearTimeout(handle.current);
        handle.current = null;
      } else {
        setQueued(true);
      }
      handle.current = setTimeout(() => {
        refreshPdf(stateProxy);
        setQueued(false);
        handle.current = null;
      }, 1000);
    });
  }, [stateProxy, refreshPdf])

  return useMemo(
    () => ({
      resume: blob,
      download: (blob === null ? null : (() => {
        const { name, surname } = stateProxy.personalInformation;
        return import("../utils/dataEmbeding")
          .then(module => module.addEmbededData(
            blob, appStateProxy, t("embededPdfFileDescription")
          ))
          .then(file => downloadFile(file, `${name} ${surname} - ${t`resume`}.pdf`))
          .catch(console.error)
      })),
      loading: loading || renderQueued,
    }),
    [blob, loading, renderQueued],
  );
};
