import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { downloadFile } from "../utils/downloadFile";
import { AppState, usePersistentState, useAppState } from "../state/store";
import { ref, subscribe } from "valtio";
import { arraysEqual } from "../utils/array";
import useTranslation from "next-translate/useTranslation";
import { ApplicationPersistentState, ResumeModel } from "../models/v1";
import type { WorkerRequest, WorkerResponse } from "./worker";
import {countResumeDownload} from "../utils/analytics";

class CreationController {
  constructor(private persistentStateProxy: ApplicationPersistentState, private pdfStateProxy: AppState, private translate: (value: string) => string) {
    this.resumeProxy = persistentStateProxy.resume;
  }

  start() {
    this.setupWorker();
    this.setupSubscription();
  }

  stop() {
    this.worker?.terminate();
    this.unsubscribe?.();
  }

  refresh() {
    const worker = this.worker;
    if (!worker) {
      return;
    }

    this.requestIndex += 1;

    const message: WorkerRequest = {
      requestIndex: this.requestIndex,
      resumeJson: JSON.stringify(this.resumeProxy),
      translations: {
        contact: this.translate("contact"),
        phone: this.translate("phone"),
        email: this.translate("email"),
      }
    };

    worker.postMessage(message)
  }

  private setupWorker = () => {
    this.worker = new Worker(new URL('./worker', import.meta.url));
    this.worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const { requestIndex, blob } = event.data;
      if (requestIndex === this.requestIndex) {
        this.pdfStateProxy.renderingState.pdfCreationInProgress = false;
        this.pdfStateProxy.rendered.file = ref(blob);
        this.pdfStateProxy.rendered.download = this.createDownload(blob);
      }
    }
    this.worker.onerror = (err) => {
      this.pdfStateProxy.renderingState.pdfCreationInProgress = false;
    };
  }

  private createDownload = (blob: Blob) => async () => {
    const { name, surname } = this.resumeProxy.personalInformation;
    try {
      const module = await import("../utils/dataEmbeding");
      const file = await module.addEmbededData(
        blob, this.persistentStateProxy, this.translate("embededPdfFileDescription")
      );
      countResumeDownload(this.resumeProxy, file.size);
      downloadFile(
        file,
        `${name} ${surname} - ${this.translate("resume")}.pdf`
      );
      if (this.resumeProxy.sections.reduce((acc, s) => s.content.length+acc, 0) > 0) {
        this.pdfStateProxy.downloadInfo.downloaded = true;
      }
    } catch (message) {
      return console.error(message);
    }
  }

  private setupSubscription = () => {
    let handle: ReturnType<typeof setTimeout> | undefined;
    let previousAppearance: string[] = Object.values(this.resumeProxy.appearance);
    const handler = () => {
      this.pdfStateProxy.renderingState.pdfCreationInProgress = true;
      if (handle) {
        clearTimeout(handle);
        handle = undefined;
      }
      // Don't wait at all when appearance is changed
      const newAppearance = Object.values(this.resumeProxy.appearance);
      if (!arraysEqual(previousAppearance, newAppearance)) {
        previousAppearance = newAppearance;
        this.refresh();
        return;
      }

      handle = setTimeout(() => {
        this.refresh();
      }, 1000);
    };
    subscribe(this.resumeProxy, handler);
    handler();
  }

  private resumeProxy: ResumeModel;
  private requestIndex: number = 0;
  private worker?: Worker;
  private unsubscribe?: () => void;
}

// Creates pdf in worker running in the background.
export const useCreatePdf = () => {
  const { t } = useTranslation("app");
  const pdfStateProxy = useAppState();
  const appStateProxy = usePersistentState();

  useEffect(() => {
    const controller = new CreationController(appStateProxy, pdfStateProxy, t);
    controller.start();

    return () => {
      controller.stop();
    }
  }, [pdfStateProxy, appStateProxy, t]);
};
