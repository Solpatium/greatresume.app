import ReactPDF, { Document } from "@react-pdf/renderer";
import type { ResumeModel } from "../models/v1";
import { registerRequiredFonts } from "./fonts";
import { makeStylesheet, styleContext, StyleSheet } from "./stylesheet";
import { aleksandraTemplate } from "./templates/aleksandra";
import { bubblyTemplate } from "./templates/bubbly";
import { edwardTemplate } from "./templates/edward";
import { libraryTemplate } from "./templates/library";
import { peachyTemplate } from "./templates/peachy";
import { jamesTemplate } from "./templates/james";
import { TemplateDetails } from "./types";

let cachedStyleSheet: null | { title: string, styleSheet: StyleSheet } = null;

export const createPdf = (data: ResumeModel, translate: (value: string) => string): ReturnType<typeof ReactPDF.pdf> => {
  // TODO: move from here!
  const templates: Record<string, TemplateDetails> = {
    aleksandra: aleksandraTemplate,
    library: libraryTemplate,
    bubbly: bubblyTemplate,
    edward: edwardTemplate,
    peachy: peachyTemplate,
    james: jamesTemplate,
  };
  // Register all fonts, they are only fetched when needed
  Object.values(templates).forEach(d => registerRequiredFonts(d.fonts));

  const { component: Template, styles, title } = templates[data.appearance.template] ?? aleksandraTemplate;

  // Used the cached one if possible
  const styleSheet = cachedStyleSheet && cachedStyleSheet.title === title ? cachedStyleSheet.styleSheet : makeStylesheet(styles);
  cachedStyleSheet = { title, styleSheet };

  return ReactPDF.pdf(<Document>
    <styleContext.Provider value={styleSheet}>
      <Template data={data} translate={translate} />
    </styleContext.Provider>
  </Document>);
}