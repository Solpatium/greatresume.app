import React, { useEffect, useMemo, useRef, useState } from "react";
import { Document, usePDF } from "@react-pdf/renderer";
import { downloadFile } from "../utils/downloadFile";
import { aleksandraTemplate } from "./templates/aleksandra";
import { TemplateDetails } from "./types";
import { libraryTemplate } from "./templates/library";
import { registerRequiredFonts } from "./fonts";
import { useAppState } from "../state/store";
import { subscribe, useSnapshot } from "valtio";
import { arraysEqual } from "../utils/array";
import { ResumeModel } from "../models/v1";

export const templates: Record<string, TemplateDetails> = {
  aleksandra: aleksandraTemplate,
  library: libraryTemplate,
};


const Resume: React.FC<{ data: ResumeModel }> = ({ data }) => {
  const { component: Template } = templates[data.appearance.template] ?? aleksandraTemplate;;
  return (
    <Document>
      <Template data={data} />
    </Document>
  )
}

export const useRenderResume = (): {
  url: string | null;
  download: (() => void) | null;
  loading: boolean
} => {
  const stateProxy = useAppState().resume;

  // Register all fonts, they are only fetched when needed
  useEffect(() => {
    Object.values(templates).forEach(d => registerRequiredFonts(d.fonts));
  }, []);

  const [{ url, loading }, refreshPdf] = usePDF({
    document: (<Resume data={stateProxy} />),
  });

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
        console.log("QUEUEUD")
        setQueued(true);
      }
      handle.current = setTimeout(() => {
        refreshPdf();
        setQueued(false);
        handle.current = null;
      }, 1000);
    });
  }, [stateProxy, refreshPdf])

  return useMemo(
    () => ({
      url,
      download: (url === null ? null : (() => {
        downloadFile(url, "resume.pdf");
      })),
      loading: loading || renderQueued,
    }),
    [url, loading, renderQueued],
  );
};
