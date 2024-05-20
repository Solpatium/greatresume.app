import { Step, Stepper } from "../../molecules/stepper";
import React, { useState } from "react";
import { PersonalInformation } from "./personalInfo";
import { Appearance } from "./appearance";

import { StepsForm } from "./sections";
import useTranslation from "next-translate/useTranslation";
import { useSnapshot } from "valtio";
import { usePersistentState } from "../../../state/store";
import { LegalClauseForm } from "./legalClause";
import { Export } from "./export";
import cn from "classnames";
import { SectionTitle } from "../../molecules/sectionTitle";
import { LanguageSwitcher } from "../languageSwitcher";
import { DataImport } from "../dataImport";
import { Logo } from "../../sections/header";
import { useCounter } from "react-use";


export const Editor: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { t } = useTranslation("app");
  const state = usePersistentState();
  const [counter, {inc}] = useCounter(0);

  // Subscribe to sections to render them properly below
  useSnapshot(state.resume.sections);

  let steps: Step[] = [{
    element: <><SectionTitle title={t`steps.personalInfo.title`} /><PersonalInformation /></>,
    title: t`steps.personalInfo.title`,
    id: "personal-info",
  }, {
    element: <><SectionTitle title={t`steps.appearance.title`} /><Appearance /></>,
    title: t`steps.appearance.title`,
    id: "appearance",
  }, {
    element: <><StepsForm /></>,
    title: t`newSection.title`,
    id: "sections",
  }, {
    element: <><SectionTitle title={t`steps.legalClause.title`} /><LegalClauseForm stateProxy={state.resume} /></>,
    title: t`steps.legalClause.title`,
    id: "legal-clause",
  }]

  return (
    <div className={cn(className, "relative flex flex-col gap-5 lg:gap-8 lg:mt-3")}>
      <div className="p-5 flex flex-col justify-center items-center gap-3 xl:gap-0 xl:flex-row md:justify-between">
        <Logo className="origin-center scale-[80%] xl:origin-left xl:scale-[85%]"/>
        <div className="flex gap-3 justify-end items-center flex-wrap">
          <DataImport onImport={inc}/>
          <LanguageSwitcher />
        </div>
      </div>
      {/* We want to update the whole form's state right after resume is updated */}
      <Stepper key={counter} steps={steps} />
    </div>
  );
};
