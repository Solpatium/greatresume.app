import { array, boolean, enums, Infer, is, number, optional, string, type, union } from "superstruct";
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
import { sectionBase } from "./sections/base";

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

export type Section = Infer<typeof sectionStruct>;
export type SectionBase = Infer<typeof sectionBase>;

const appearanceSettings = type({
  template: string(),
  image: optional(string()),
  paperSize: paperSizeStruct,
})

export type AppearanceSettings = Infer<typeof appearanceSettings>;

export const resumeStruct = type({
  version: string(),
  personalInformation: personalInformationStruct,
  appearance: appearanceSettings,
  sections: array(sectionStruct),
  legalClause: string(),
});
export type ResumeModel = Infer<typeof resumeStruct>;

const progressStruct = type({
  sectionsFilled: number(),
});

export const applicationStateStruct = type({
  resume: resumeStruct,
  progress: progressStruct,
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

export const createEmptySection = (title: string, kind: SectionKind): Section => {
  // @ts-ignore
  const section = mapping[kind](kind);
  section.title = title;
  return section;
}

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
    template: "professional",
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
