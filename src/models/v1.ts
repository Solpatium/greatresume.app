export type PaperSize = "A4" | "letter";

export interface Section<T> {
  title?: string;
  content: T;
}

export interface DatedEntry {
  from: string;
  to?: string;
  description: string;
  city: string;
}

export interface PersonalInformation {
  name?: string;
  surname?: string;
  jobTitle?: string;
  shortDescription?: string;
  addressFirstLine?: string;
  addressSecondLine?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
}

export interface Language {
  name: string;
  level: string;
}

export type Skill = {
  name: string;
  level: string;
};

export type EducationEntry = DatedEntry & { school: string; degree: string };

export type Keyed<T> = { key: string | number } & T;

export type RepeaterSection<T> = Section<Keyed<T>[]>;

export type WorkEntry = DatedEntry & { company: string; title: string };

export interface ResumeModel {
  version: string; // 1
  template?: string;
  image?: string;
  paperSize: PaperSize;
  personalInformation: PersonalInformation;
  languages: RepeaterSection<Language>;
  perks: RepeaterSection<string>;
  skills: RepeaterSection<Skill>;
  education: RepeaterSection<EducationEntry>;
  workExperience: RepeaterSection<WorkEntry>;
  clause?: string;
}

export const emptyResume: Readonly<ResumeModel> = {
  version: "1",
  paperSize: "A4",
  personalInformation: {},
  languages: { content: [] },
  perks: { content: [] },
  skills: { content: [] },
  education: { content: [] },
  workExperience: { content: [] },
};
