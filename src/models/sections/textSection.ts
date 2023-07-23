import { Infer, literal, string, type } from "superstruct";
import { withId } from "../../utils/lists";
import { sectionBase } from "./base";

export const textSectionTypeName = "text";
export type TextSectionType = typeof textSectionTypeName;

export const textSectionStruct = type({
  ...sectionBase.schema,
  type: literal(textSectionTypeName),
  kind: literal(textSectionTypeName),
  content: string(),
});

export type TextSection = Infer<typeof textSectionStruct>;

export const makeTextSection = (type: TextSectionType): Infer<typeof textSectionStruct> => withId({
  title: "",
  type,
  kind: type,
  content: "",
});
