import React, { useEffect, useMemo } from "react";
import { EducationEntry, ResumeModel, WorkEntry } from "../models/v1";
import { Image, Document, Page, StyleSheet, Text, usePDF, View } from "@react-pdf/renderer";
import { useDebounce } from "react-use";
import { downloadFile } from "../utils/downloadFile";
import { TwoColumns } from "./layouts/twoColumns";
import { Aleksandra, aleksandraTemplate } from "./templates/aleksandra";
import { TemplateDetails, ResumeTemplate } from "./types";
import { Library, libraryTemplate } from "./templates/library";
import { registerRequiredFonts } from "./fonts";

export const templates: Record<string, TemplateDetails> = {
  aleksandra: aleksandraTemplate,
  library: libraryTemplate,
};

registerRequiredFonts(aleksandraTemplate.fonts);
export const useRenderResume = (
  data: ResumeModel,
): { url?: string; download: () => void; loading: boolean } => {
  const templateDetails = templates[data.template] ?? aleksandraTemplate;
  const fonts = templateDetails.fonts;
  useEffect(() => registerRequiredFonts(fonts), [fonts]);

  const Template = templateDetails.component;
  const [{ url, loading }, refreshPdf] = usePDF({
    document: (
      <Document>
        <Template data={data} />
      </Document>
    ),
  });

  useDebounce(
    () => {
      refreshPdf();
    },
    1000,
    [data],
  );

  return useMemo(
    () => ({
      url,
      download: () => {
        downloadFile(url, "resume.pdf");
      },
      loading,
    }),
    [url, loading],
  );
};
