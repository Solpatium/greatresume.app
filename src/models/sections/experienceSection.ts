import { array, Infer, string, type, literal, enums } from "superstruct";
import { withId } from "../../utils/lists";
import { sectionBase } from "./base";

export const experienceTypeName = "experience";
export type ExperienceType = typeof experienceTypeName;

const kindStruct = enums(["education", "employment", "projects", "experience"]);
export type ExperienceKind = Infer<typeof kindStruct>;

const periodMixinStruct = type({
  from: string(),
  to: string(),
});
export type PeriodMixin = Infer<typeof periodMixinStruct>;

const entryStruct = type({
  title: string(),
  subtitle: string(),
  ...periodMixinStruct.schema,
  description: string(),
  id: string(),
});
export type Entry = Infer<typeof entryStruct>;

const experienceListSchema = array(entryStruct);
export type ExperienceList = Infer<typeof experienceListSchema>;

export const experienceSectionStruct = type({
  ...sectionBase.schema,
  type: literal(experienceTypeName),
  kind: kindStruct,
  content: experienceListSchema,
});

export type ExperienceSection = Infer<typeof experienceSectionStruct>;

export const makeEmptyEntry = (): Entry =>
  withId({
    title: "",
    subtitle: "",
    from: "",
    to: "",
    description: "",
    url: "",
  });

export const makeEmptyExperience = (kind: ExperienceKind): ExperienceSection =>
  withId({
    title: "",
    type: experienceTypeName,
    kind,
    content: [],
  });
