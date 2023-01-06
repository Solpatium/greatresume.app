import { Infer, string, type } from "superstruct";

const locationStruct = type({
  country: string(),
  city: string(),
  address: string(),
  postalCode: string(),
});
export type Location = Infer<typeof locationStruct>;

export const personalInformationStruct = type({
  name: string(),
  surname: string(),
  jobTitle: string(),
  shortDescription: string(),
  phone: string(),
  email: string(),
  location: locationStruct,
});
export type PersonalInformation = Infer<typeof personalInformationStruct>;
