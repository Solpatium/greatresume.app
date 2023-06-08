import { professionalTemplate } from "./professional";
import { laxTemplate } from "./lax";
import { energeticTemplate } from "./energetic";
import { seriousTemplate } from "./serious";
import { peachyTemplate } from "./peachy";
import { simpleTemplate } from "./simple";

export const templates = {
    professional: professionalTemplate,
    serious: seriousTemplate,
    lax: laxTemplate,
    energetic: energeticTemplate,
    peachy: peachyTemplate,
    simple: simpleTemplate,
};

export type TemplateId = keyof typeof templates;