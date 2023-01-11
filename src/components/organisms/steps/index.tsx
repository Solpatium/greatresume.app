import { Step, Stepper } from "../../molecules/stepper";
import React from "react";
import { PersonalInformation } from "./personalInfo";
import { Appearance } from "./appearance";

import { InterestsForm } from "./interests";
import { StepsForm } from "./sections";
import useTranslation from "next-translate/useTranslation";
import { Experience } from "./experience";
import { useSnapshot } from "valtio";
import { useAppState } from "../../../state/store";
import { KeyValueForm } from "./keyValue";
import { TextForm } from "./text";
import { Section } from "../../../models/v1";
import { LegalClauseForm } from "./legalClause";

const renderSection = (sectionWrapped: Section): React.ReactElement => {
  const { section } = sectionWrapped;
  if (section.type === "experience") {
    return <Experience stateProxy={section} />;
  }
  if (section.type == "simple list") {
    return <InterestsForm stateProxy={section.content} />
  }
  if (section.type == "key value") {
    return <KeyValueForm stateProxy={section} />;
  }
  return <TextForm stateProxy={section} />;
}

export const Editor: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { t } = useTranslation("app");
  const state = useAppState();

  // Subscribe to sections to render them properly below
  useSnapshot(state.resume.sections);

  const steps: Step[] = [
    {
      title: t`steps.appearance.title`,
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
    ...state.resume.sections.map((section) => ({
      title: section.title,
      element: renderSection(section),
    })),
    {
      title: t`steps.legalClause.title`,
      element: <LegalClauseForm stateProxy={state.resume} />
    },
    {
      title: t`steps.appearance.title`,
      element: <Appearance isFinal/>,
    },
  ];

  return (
    <div className={className}>
      <Stepper steps={steps} />
    </div>
  );
};
