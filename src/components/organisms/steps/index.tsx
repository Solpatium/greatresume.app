import { Step, Stepper } from "../../molecules/stepper";
import React, { useState } from "react";
import { PersonalInformation } from "./personalInfo";
import { Appearance } from "./appearance";

import { StepsForm } from "./sections";
import useTranslation from "next-translate/useTranslation";
import { useSnapshot } from "valtio";
import { useAppState } from "../../../state/store";
import { LegalClauseForm } from "./legalClause";
import { Export } from "./export";
import cn from "classnames";
import { SectionTitle } from "../../molecules/sectionTitle";
import { LanguageSwitcher } from "../languageSwitcher";
import { DataImport } from "../dataImport";


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
  }, {
    element: <><SectionTitle title={t`steps.appearance.title`} /><Appearance /></>,
    title: t`steps.appearance.title`,
    id: "appearance",
    onNext,
  }, {
    element: <><StepsForm /></>,
    title: t`newSection.title`,
    id: "sections",
    onNext,
  }, {
    element: <><SectionTitle title={t`steps.legalClause.title`} /><LegalClauseForm stateProxy={state.resume} /></>,
    title: t`steps.legalClause.title`,
    id: "legal-clause",
    onNext,
  }, {
    element: <><SectionTitle title={t`steps.export.title`} /><Export /></>,
    title: t`steps.export.title`,
    id: "export",
  }]

  return (
    <div className={cn(className, "relative flex flex-col gap-5 lg:gap-12")}>
      <div className="flex gap-3 justify-end">
        <DataImport/>
        <LanguageSwitcher/>
      </div>
      <Stepper maxSteps={5 + state.resume.sections.length} steps={steps} />
    </div>
  );
};
