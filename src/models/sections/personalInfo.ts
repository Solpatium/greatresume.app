import { array, Infer, string, type } from "superstruct";
import { entryStruct } from "./keyValueSection";

export const personalInformationStruct = type({
  name: string(),
  surname: string(),
  jobTitle: string(),
  phone: string(),
  email: string(),
  entries: array(entryStruct),
});
export type PersonalInformation = Infer<typeof personalInformationStruct>;
