import { Infer, literal, string, type } from "superstruct";

export const textSectionTypeName = "text";
export type TextSectionType = typeof textSectionTypeName;

export const textSectionStruct = type({
  type: literal(textSectionTypeName),
  kind: literal(textSectionTypeName),
  content: string(),
});

export type TextSection = Infer<typeof textSectionStruct>;

export const makeTextSection = (type: TextSectionType): Infer<typeof textSectionStruct> => ({
  type,
  kind: type,
  content: "",
});
