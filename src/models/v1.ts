import {
  number,
  string,
  array,
  Infer,
  enums,
  type,
  Struct,
  optional,
  union,
  is,
} from "superstruct";
import { ObjectSchema, ObjectType } from "superstruct/lib/utils";

const paperSizeStruct = enums(["A4", "LETTER"]);
export type PaperSize = Infer<typeof paperSizeStruct>;

const sectionStruct = <T>(contentSchema: Struct<T>) =>
  type({
    title: optional(string()),
    content: contentSchema,
  });

const datedEntryStruct = type({
  from: string(),
  to: string(),
  description: string(),
  city: string(),
});
export type DatedEntry = Infer<typeof datedEntryStruct>;

const personalInformationStruct = type({
  name: string(),
  surname: string(),
  jobTitle: string(),
  shortDescription: string(),
  addressFirstLine: string(),
  addressSecondLine: string(),
  city: string(),
  zipCode: string(),
  phone: string(),
  email: string(),
});
export type PersonalInformation = Infer<typeof personalInformationStruct>;

const languageStruct = type({
  name: string(),
  level: string(),
});
export type Language = Infer<typeof languageStruct>;

const skillSchema = type({
  name: string(),
  level: string(),
});
export type Skill = Infer<typeof skillSchema>;

const educationEntryStruct = type({
  ...datedEntryStruct.schema,
  school: string(),
  degree: string(),
});
export type EducationEntry = Infer<typeof educationEntryStruct>;

export type Keyed<T> = { key: string | number } & T;

const repeaterSection = <T extends ObjectSchema>(schema: Struct<ObjectType<T>, T>) =>
  sectionStruct(
    array(
      type({
        key: union([string(), number()]),
        ...schema.schema,
      }),
    ),
  );

const workEntryStruct = type({
  ...datedEntryStruct.schema,
  title: string(),
  company: string(),
});
export type WorkEntry = Infer<typeof workEntryStruct>;

const interestStruct = type({ name: string() });
export type Interest = Infer<typeof interestStruct>;

export const resumeStruct = type({
  version: string(),
  template: optional(string()),
  image: optional(string()),
  paperSize: paperSizeStruct,
  personalInformation: personalInformationStruct,
  languages: repeaterSection(languageStruct),
  interests: repeaterSection(interestStruct),
  skills: repeaterSection(skillSchema),
  education: repeaterSection(educationEntryStruct),
  experience: repeaterSection(workEntryStruct),
  legalClause: string(),
});
export type ResumeModel = Infer<typeof resumeStruct>;

export const makeEmptyResume = ({
  paperSize,
  titles,
  legalClause,
}: {
  paperSize: string;
  titles: Record<"languages" | "interests" | "skills" | "education" | "experience", string>;
  legalClause: string;
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
    addressFirstLine: "",
    addressSecondLine: "",
    city: "",
    zipCode: "",
    phone: "",
  },
  languages: { title: titles.languages, content: [] },
  interests: { title: titles.interests, content: [] },
  skills: { title: titles.skills, content: [] },
  education: { title: titles.education, content: [] },
  experience: { title: titles.experience, content: [] },
  legalClause,
});

export const dummyResume = makeEmptyResume({
  paperSize: "A4",
  titles: {
    languages: "Languages",
    interests: "Interests",
    skills: "Skills",
    education: "Education",
    experience: "Experience",
  },
  legalClause: "",
});
