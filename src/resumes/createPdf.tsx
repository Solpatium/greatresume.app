// Only import in worker!
import ReactPDF, { Document } from "@react-pdf/renderer";
import type { ResumeModel } from "../models/v1";
import { registerRequiredFonts } from "./fonts";
import { makeStylesheet, styleContext, StyleSheet } from "./stylesheet";
import { professionalTemplate } from "./templates/professional";
import { templates } from "./templates";

let cachedStyleSheet: null | { name: string, styleSheet: StyleSheet } = null;

export const createPdf = (data: ResumeModel, translate: (value: string) => string): ReturnType<typeof ReactPDF.pdf> => {
  // Register all fonts, they are only fetched when needed
  Object.values(templates).forEach(d => registerRequiredFonts(d.fonts));

  const templateName = data.appearance.template;
  const { component: Template, styles } = templates[templateName] ?? professionalTemplate;

  // Used the cached one if possible
  const styleSheet = cachedStyleSheet && cachedStyleSheet.name === templateName ? cachedStyleSheet.styleSheet : makeStylesheet(styles);
  cachedStyleSheet = { name: templateName, styleSheet };

  return ReactPDF.pdf(<Document>
    <styleContext.Provider value={styleSheet}>
      <Template data={data} translate={translate} />
    </styleContext.Provider>
  </Document>);
}