import React, { useEffect, useMemo, useRef, useState } from "react";
import { Document, usePDF } from "@react-pdf/renderer";
import { downloadFile } from "../utils/downloadFile";
import { aleksandraTemplate } from "./templates/aleksandra";
import { TemplateDetails } from "./types";
import { libraryTemplate } from "./templates/library";
import { registerRequiredFonts } from "./fonts";
import { useAppState } from "../state/store";
import { subscribe } from "valtio";
import { arraysEqual } from "../utils/array";
import { ResumeModel } from "../models/v1";
import useTranslation from "next-translate/useTranslation";

export const templates: Record<string, TemplateDetails> = {
  aleksandra: aleksandraTemplate,
  library: libraryTemplate,
};


const Resume: React.FC<{ data: ResumeModel, translate: (key: string) => string }> = ({ data, translate }) => {
  // Used for fast refresh
  const templates: Record<string, TemplateDetails> = {
    aleksandra: aleksandraTemplate,
    library: libraryTemplate,
  };
  const { component: Template } = templates[data.appearance.template] ?? aleksandraTemplate;
  console.time("RENDER")
  return (
    <Document>
      <Template data={data} translate={translate} />
    </Document>
  )
}

export const useRenderResume = (): {
  resume: Blob | null;
  download: (() => void) | null;
  loading: boolean
} => {
  const {t} = useTranslation("app");
  const appStateProxy = useAppState();
  const stateProxy = appStateProxy.resume;

  // Register all fonts, they are only fetched when needed
  useEffect(() => {
    Object.values(templates).forEach(d => registerRequiredFonts(d.fonts));
  }, []);

  const [{ blob, loading }, refreshPdf] = usePDF({
    document: (<Resume data={stateProxy} translate={t} />),
  });

  useEffect(() => {console.timeEnd("RENDER")})

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
        refreshPdf();
        return;
      }

      if (handle.current) {
        clearTimeout(handle.current);
        handle.current = null;
      } else {
        setQueued(true);
      }
      handle.current = setTimeout(() => {
        refreshPdf();
        setQueued(false);
        handle.current = null;
      }, 1000);
    });
  }, [stateProxy, refreshPdf])

  useEffect(() => {
    refreshPdf();
  }, [libraryTemplate]);

  return useMemo(
    () => ({
      resume: blob,
      download: (blob === null ? null : (() => {
        const {name, surname} = stateProxy.personalInformation;
        import("../utils/dataEmbeding")
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
