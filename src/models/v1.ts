import { array, boolean, enums, Infer, is, optional, string, type, union } from "superstruct";
import { personalInformationStruct } from "./sections/personalInfo";
import {
  ExperienceKind,
  experienceSectionStruct,
  ExperienceType,
  makeEmptyExperience,
} from "./sections/experienceSection";
import {
  KeyValueKind,
  keyValueSectionStruct,
  KeyValueType,
  makeKeyValue,
} from "./sections/keyValueSection";
import {
  makeSimpleList,
  SimpleListKind,
  simpleListSectionStruct,
  SimpleListType,
} from "./sections/simpleListSection";
import { makeTextSection, textSectionStruct, TextSectionType } from "./sections/textSection";
import { withId } from "../utils/lists";

const paperSizeStruct = enums(["A4", "LETTER"]);
export type PaperSize = Infer<typeof paperSizeStruct>;

export type SectionKind = TextSectionType | ExperienceKind | KeyValueKind | SimpleListKind;
export type SectionType = TextSectionType | ExperienceType | KeyValueType | SimpleListType;

const sectionStruct = union([
  experienceSectionStruct,
  keyValueSectionStruct,
  simpleListSectionStruct,
  textSectionStruct,
]);

const sectionEntry = type({
  title: string(),
  id: string(),
  filled: optional(boolean()),
  section: sectionStruct,
});
export type Section = Infer<typeof sectionEntry>;

const appearanceSettings = type({
  template: string(),
  image: optional(string()),
  paperSize: paperSizeStruct,
})

export type AppearanceSettings = Infer<typeof appearanceSettings>;

export const resumeStruct = type({
  version: string(),
  filledPersonalInformation: optional(boolean()),
  personalInformation: personalInformationStruct,
  filledAppearance: optional(boolean()),
  appearance: appearanceSettings,
  filledSections: optional(boolean()),
  sections: array(sectionEntry),
  filledLegalClause: optional(boolean()),
  legalClause: string(),
});
export type ResumeModel = Infer<typeof resumeStruct>;


export const applicationStateStruct = type({
  resume: resumeStruct,
});
export type ApplicationPersistentState = Infer<typeof applicationStateStruct>;

const mapping = {
  education: makeEmptyExperience,
  experience: makeEmptyExperience,
  employment: makeEmptyExperience,
  projects: makeEmptyExperience,
  interests: makeSimpleList,
  languages: makeKeyValue,
  skills: makeKeyValue,
  text: makeTextSection,
};

export const createEmptySection = (title: string, kind: SectionKind): Section =>
  withId({
    title,
    // @ts-ignore
    section: mapping[kind](kind),
  });

export const makeEmptyResume = ({
  paperSize,
  texts,
}: {
  paperSize: string;
  texts: {
    contactTitle: string;
    experienceTitle: string;
    educationTitle: string;
    legalClause: string;
  };
}): ResumeModel => ({
  version: "1",
  appearance: {
    paperSize: is(paperSize, paperSizeStruct) ? paperSize : "A4",
    template: "aleksandra",
    image: undefined,
  },
  personalInformation: {
    name: "",
    surname: "",
    jobTitle: "",
    email: "",
    phone: "",
    links: [],
  },
  sections: [],
  legalClause: texts.legalClause,
});
