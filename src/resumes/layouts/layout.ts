import React, { ReactElement } from "react";
import { EducationEntry, ResumeModel, WorkEntry } from "../../models/v1";

export type Renderer<Type> = (data: Type, index: number) => ReactElement;

export type ResumeLayout = React.FC<{
  data: ResumeModel;
  className?: string;
  render: {
    education: Renderer<EducationEntry>;
    experience: Renderer<WorkEntry>;
  };
}>;
