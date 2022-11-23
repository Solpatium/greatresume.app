import React, { useMemo } from "react";
import { EducationEntry, ResumeModel, WorkEntry } from "../models/v1";
import { HTMLText } from "../components/atoms/htmlText";
import { Renderer } from "./layouts/layout";
import { Image, Document, Page, StyleSheet, Text, usePDF, View } from "@react-pdf/renderer";
import { useDebounce } from "react-use";
import { downloadFile } from "../utils/downloadFile";
import { TwoColumns } from "./layouts/twoColumns";
import { Aleksandra } from "./templates/aleksandra";
import { registerResumeFonts } from "./fonts";
import { ResumeTemplate } from "./types";
import { Library } from "./templates/library";

export const templates: Record<
  string,
  {
    component: ResumeTemplate;
    title: string;
  }
> = {
  aleksandra: {
    component: Aleksandra,
    title: "Aleksandra",
  },
  library: {
    component: Library,
    title: "Library",
  },
};

registerResumeFonts();

export const useRenderResume = (data: ResumeModel): { url?: string; download: () => void } => {
  const Template = templates[data.template]?.component ?? Aleksandra;
  const [{ url }, refreshPdf] = usePDF({
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
    }),
    [url],
  );
};
