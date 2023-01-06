import { array, Infer, string, type, literal, enums } from "superstruct";

/*
  Can be used as skill lists with described levels.
 */

export const keyValueTypeName = "key value";
export type KeyValueType = typeof keyValueTypeName;

const kindStruct = enums(["skills", "languages"]);
export type KeyValueKind = Infer<typeof kindStruct>;

const entryStruct = type({
  name: string(),
  value: string(),
});
export type Entry = Infer<typeof entryStruct>;

const keyValueListSchema = array(entryStruct);
export type KeyValueList = Infer<typeof keyValueListSchema>;

export const keyValueSectionStruct = type({
  type: literal(keyValueTypeName),
  kind: kindStruct,
  content: keyValueListSchema,
});

export const makeKeyValue = (kind: KeyValueKind): Infer<typeof keyValueSectionStruct> => ({
  type: keyValueTypeName,
  kind,
  content: [
    {
      name: "",
      value: "",
    },
  ],
});
