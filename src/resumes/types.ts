import { ResumeModel } from "../models/v1";
import { FontRequirements } from "./fonts";

export type ResumeTemplate = React.FC<{ data: Readonly<ResumeModel>, translate: (key: string) => string }>;

export interface TemplateDetails {
  component: ResumeTemplate;
  fonts: FontRequirements;
  title: string;
}
