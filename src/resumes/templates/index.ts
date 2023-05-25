import { aleksandraTemplate } from "./aleksandra";
import { bubblyTemplate } from "./bubbly";
import { edwardTemplate } from "./edward";
import { libraryTemplate } from "./library";
import { peachyTemplate } from "./peachy";
import { jamesTemplate } from "./james";

export const templates = {
    aleksandra: aleksandraTemplate,
    library: libraryTemplate,
    bubbly: bubblyTemplate,
    edward: edwardTemplate,
    peachy: peachyTemplate,
    james: jamesTemplate,
};

export type TemplateId = keyof typeof templates;