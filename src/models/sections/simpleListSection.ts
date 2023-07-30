import { array, string, type, literal, enums, Infer } from "superstruct";
import { sectionBase } from "./base";
import { withId } from "../../utils/lists";

/*
  Can be used as list of interests.
 */

export const simpleListTypeName = "simple list";
export type SimpleListType = typeof simpleListTypeName;

const kindStruct = enums(["interests"]);
export type SimpleListKind = Infer<typeof kindStruct>;

const entry = type({
  content: string(),
  id: string(),
})

export type SimpleListEntry = Infer<typeof entry>;

export const simpleListSectionStruct = type({
  ...sectionBase.schema,
  type: literal(simpleListTypeName),
  kind: kindStruct,
  content: array(entry),
});

export type SimpleListSection = Infer<typeof simpleListSectionStruct>;

export const makeSimpleList = (kind: SimpleListKind): SimpleListSection => withId({
  title: "",
  type: simpleListTypeName,
  kind,
  content: [],
});
