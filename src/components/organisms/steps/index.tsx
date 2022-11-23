import { Stepper } from "../../molecules/stepper";
import React, { useCallback } from "react";
import { PersonalInformation } from "./personalInfo";
import { ResumeModel } from "../../../models/v1";
import { StateSetter } from "../../../utils/mutators";
import { Appearance } from "./appearance";
import { WorkExperience } from "./workExperience";
import { EducationForm } from "./education";
import { useRouter } from "next/router";
import { SkillsForm } from "./skills";
import { InterestsForm } from "./interests";
import { LegalClauseForm } from "./legalClause";

const steps = [
  {
    path: "/creator/templates",
    title: "Appearance",
    element: Appearance,
  },
  {
    path: "/creator/personal-info",
    title: "Personal info",
    element: PersonalInformation,
  },
  {
    path: "/creator/experience",
    title: "Experience",
    element: WorkExperience,
  },
  {
    path: "/creator/education",
    title: "Education",
    element: EducationForm,
  },
  {
    path: "/creator/skills",
    title: "Skills",
    element: SkillsForm,
  },
  {
    path: "/creator/interests",
    title: "Interests",
    element: InterestsForm,
  },
  {
    path: "/creator/legal-clause",
    title: "Legal clause",
    element: LegalClauseForm,
  },
];

export const SectionSet: React.FC<{
  state: ResumeModel;
  setState: StateSetter<ResumeModel>;
  className?: string;
}> = props => {
  const { query, push } = useRouter();
  const selected = steps.find(p => p.path.replace("/creator/", "") === query.step?.[0]) ?? steps[0];
  const goTo = useCallback(
    (path: string) => {
      push(path, undefined, { shallow: true });
    },
    [push],
  );
  return (
    <div className={props.className}>
      <Stepper goTo={goTo} selected={selected.path} {...props} steps={steps} />
    </div>
  );
};
