import { array, enums, Infer, is, optional, string, type, union } from "superstruct";
import { personalInformationStruct } from "./sections/personalInfo";
import {
  ExperienceKind,
  experienceSectionStruct,
  ExperienceType,
  experienceTypeName,
  makeEmptyExperience,
} from "./sections/experienceSection";
import {
  KeyValueKind,
  keyValueSectionStruct,
  KeyValueType,
  keyValueTypeName,
  makeKeyValue,
} from "./sections/keyValueSection";
import {
  makeSimpleList,
  SimpleListKind,
  simpleListSectionStruct,
  SimpleListType,
  simpleListTypeName,
} from "./sections/simpleListSection";
import {
  makeTextSection,
  textSectionStruct,
  TextSectionType,
  textSectionTypeName,
} from "./sections/textSection";

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
  section: sectionStruct,
});
export type Section = Infer<typeof sectionEntry>;

export const resumeStruct = type({
  version: string(),
  template: string(),
  image: optional(string()),
  paperSize: paperSizeStruct,
  personalInformation: personalInformationStruct,
  sections: array(sectionEntry),
  legalClause: string(),
});
export type ResumeModel = Infer<typeof resumeStruct>;

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
export const createEmptySection = (title: string, kind: SectionKind): Section => ({
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
    experienceTitle: string;
    educationTitle: string;
    legalClause: string;
  };
}): ResumeModel => ({
  version: "1",
  paperSize: is(paperSize, paperSizeStruct) ? paperSize : "A4",
  template: undefined,
  image: undefined,
  personalInformation: {
    name: "",
    surname: "",
    jobTitle: "",
    shortDescription: "",
    email: "",
    phone: "",
    location: {
      country: "",
      city: "",
      address: "",
      postalCode: "",
    },
  },
  sections: [
    createEmptySection(texts.experienceTitle, "employment"),
    createEmptySection(texts.educationTitle, "education"),
  ],
  legalClause: texts.legalClause,
});
