import { array, string, type, literal, enums, Infer } from "superstruct";

/*
  Can be used as list of interests.
 */

export const simpleListTypeName = "simple list";
export type SimpleListType = typeof simpleListTypeName;

const kindStruct = enums(["interests"]);
export type SimpleListKind = Infer<typeof kindStruct>;

export const simpleListSectionStruct = type({
  type: literal(simpleListTypeName),
  kind: kindStruct,
  content: array(string()),
});

export const makeSimpleList = (kind: SimpleListKind): Infer<typeof simpleListSectionStruct> => ({
  type: simpleListTypeName,
  kind,
  content: [""],
});
