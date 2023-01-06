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

const typeToStep: Record<SectionType, FormStep> = {};

export const Editor: React.FC<{
  state: ResumeModel;
  setState: StateSetter<ResumeModel>;
  className?: string;
}> = ({ state, setState, className }) => {
  const { t } = useTranslation("app");
  const makeSectionStateSetter = useNestArrayState(useNestObjectState(useState)("sections"));
  const steps: Step[] = useMemo(() => {
    return [
      {
        title: "Appearance",
        element: Appearance,
      },
      {
        title: t`newSection.title`,
        element: StepsForm,
      },
      {
        title: "Personal info",
        element: PersonalInformation,
      },
      ...state.sections.map((section, i) => {
        if (section.section.type === "experience") {
          return {
            title: section.title,
            element: <Experience state={section.section} setState={makeSectionStateSetter(i)} />,
          };
        }
        return {
          title: section.title,
          element: PersonalInformation,
        } as Step;
      }),
    ];
  }, [state.sections, t]);

  return (
    <div className={className}>
      <Stepper state={state} setState={setState} steps={steps} />
    </div>
  );
};
