import { array, Infer, string, type, literal, enums } from "superstruct";
import { sectionBase } from "./base";
import { withId } from "../../utils/lists";

/*
  Can be used as skill lists with described levels.
 */

export const keyValueTypeName = "key value";
export type KeyValueType = typeof keyValueTypeName;

const kindStruct = enums(["skills", "languages"]);
export type KeyValueKind = Infer<typeof kindStruct>;

export const entryStruct = type({
  id: string(),
  name: string(),
  value: string(),
});
export type Entry = Infer<typeof entryStruct>;

const keyValueListSchema = array(entryStruct);
export type KeyValueList = Infer<typeof keyValueListSchema>;

export const keyValueSectionStruct = type({
  ...sectionBase.schema,
  type: literal(keyValueTypeName),
  kind: kindStruct,
  content: keyValueListSchema,
});

export type KeyValueSection = Infer<typeof keyValueSectionStruct>;

export const makeKeyValue = (kind: KeyValueKind): Infer<typeof keyValueSectionStruct> => withId({
  title: "",
  type: keyValueTypeName,
  kind,
  content: [],
});
