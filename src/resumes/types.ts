import { ResumeModel } from "../models/v1";
import { FontRequirements } from "./fonts";

export type ResumeTemplate = React.FC<{ data: ResumeModel }>;

export interface TemplateDetails {
  component: ResumeTemplate;
  fonts: FontRequirements;
  title: string;
}
