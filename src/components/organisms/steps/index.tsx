import { Step, Stepper } from "../../molecules/stepper";
import React, { useState } from "react";
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
import { Export } from "./export";
import cn from "classnames";
import { SectionTitle } from "../../molecules/sectionTitle";


const renderSection = (section: Section): React.ReactElement => {
  if (section.type === "experience") {
    return <Experience stateProxy={section} />;
  } else
  if (section.type == "simple list") {
    return <InterestsForm stateProxy={section} />
  } else
  if (section.type == "key value") {
    return <KeyValueForm stateProxy={section} />;
  } else {
    return <TextForm stateProxy={section} />;
  }
}

export const Editor: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { t } = useTranslation("app");
  const state = useAppState();

  const progress = useSnapshot(state.progress);
  let sectionsLeft = 100;///progress.sectionsFilled;

  // Subscribe to sections to render them properly below
  useSnapshot(state.resume.sections);

  const onNext = () => {
    state.progress.sectionsFilled += 1;
  }

  let steps: Step[] = [{
    element: <><SectionTitle title={t`steps.personalInfo.title`} /><PersonalInformation /></>,
    title: t`steps.personalInfo.title`,
    id: "personal-info",
    onNext,
  }];
  if (sectionsLeft) {
    steps.push({
      element: <><SectionTitle title={t`steps.appearance.title`} /><Appearance /></>,
      title: t`steps.appearance.title`,
      id: "appearance",
      onNext,
    });
    sectionsLeft -= 1;
  }
  for (let i = 0; i < state.resume.sections.length && sectionsLeft; i++) {
    let section = state.resume.sections[i]!;
    steps.push({
      element: renderSection(section),
      title: section.title,
      id: "section-" + section.id,
      onNext,
    });
    sectionsLeft -= 1;
  }
  if (sectionsLeft) {
    steps.push({
      element: <><SectionTitle title={t`newSection.title`} /><StepsForm /></>,
      title: t`newSection.title`,
      id: "sections",
      onNext,
    });
    sectionsLeft -= 1;
  }
  if (sectionsLeft) {
    steps.push({
      element: <><SectionTitle title={t`steps.legalClause.title`} /><LegalClauseForm stateProxy={state.resume} /></>,
      title: t`steps.legalClause.title`,
      id: "legal-clause",
      onNext,
    });
    sectionsLeft -= 1;
  }
  if (sectionsLeft) {
    steps.push({
      element: <><SectionTitle title={t`steps.export.title`} /><Export /></>,
      title: t`steps.export.title`,
      id: "export",
    });
    sectionsLeft -= 1;
  }

  return (
    <div className={cn(className, "relative flex flex-col gap-5 lg:gap-12")}>
      <Stepper maxSteps={5 + state.resume.sections.length} steps={steps} />
    </div>
  );
};
