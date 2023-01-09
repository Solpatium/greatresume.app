import { Step, Stepper } from "../../molecules/stepper";
import React, { useMemo, useState } from "react";
import { PersonalInformation } from "./personalInfo";
import { ResumeModel, SectionType } from "../../../models/v1";
import { StateSetter, useNestArrayState, useNestObjectState } from "../../../utils/mutators";
import { Appearance } from "./appearance";

import { SkillsForm } from "./datedEntries";
import { InterestsForm } from "./interests";
import { LegalClauseForm } from "./legalClause";
import { StepsForm } from "./sections";
import useTranslation from "next-translate/useTranslation";
import { FormStep } from "./types";
import { Experience } from "./experience";
import { useSnapshot } from "valtio";
import { useAppState } from "../../../state/store";

const steps = [
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

export const Editor: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { t } = useTranslation("app");
  const state = useAppState();

  // Subscribe to sections to render them properly below
  useSnapshot(state.resume.sections);

  const steps: Step[] = [
    {
      title: "Appearance",
      element: <Appearance />,
    },
    {
      title: t`newSection.title`,
      element: <StepsForm />,
    },
    {
      title: "Personal info",
      element: <PersonalInformation />,
    },
    ...state.resume.sections.map((section, i) => {
      if (section.section.type === "experience") {
        return {
          title: section.title,
          element: <Experience stateProxy={section.section} />,
        };
      }
      return {
        title: "dupa",
        element: "",
      } as Step;
    }),
  ];

  return (
    <div className={className}>
      <Stepper steps={steps} />
    </div>
  );
};
