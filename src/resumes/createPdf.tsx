import ReactPDF, { Document } from "@react-pdf/renderer";
import type { ResumeModel } from "../models/v1";
import { registerRequiredFonts } from "./fonts";
import { aleksandraTemplate } from "./templates/aleksandra";
import { bubblyTemplate } from "./templates/bubbly";
import { edwardTemplate } from "./templates/edward";
import { libraryTemplate } from "./templates/library";
import { TemplateDetails } from "./types";

export const createPdf = (data: ResumeModel, translate: (value: string) => string): ReturnType<typeof ReactPDF.pdf> => {
  // TODO: move from here!
  const templates: Record<string, TemplateDetails> = {
    aleksandra: aleksandraTemplate,
    library: libraryTemplate,
    bubbly: bubblyTemplate,
    edward: edwardTemplate,
  };
  // Register all fonts, they are only fetched when needed
  Object.values(templates).forEach(d => registerRequiredFonts(d.fonts));

  const { component: Template } = templates[data.appearance.template] ?? aleksandraTemplate;
  return ReactPDF.pdf(<Document>
    <Template data={data} translate={translate} />
  </Document>);
}