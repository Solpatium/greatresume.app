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
import { Export } from "./export";
import cn from "classnames";
import { SectionTitle } from "../../molecules/sectionTitle";
import { useRerender } from "../../../utils/hooks";


const renderSection = (sectionWrapped: Section): React.ReactElement => {
  const { section } = sectionWrapped;
  let sectionForm: React.ReactElement;
  if (section.type === "experience") {
    sectionForm = <Experience stateProxy={section} />;
  } else
    if (section.type == "simple list") {
      sectionForm = <InterestsForm stateProxy={section.content} />
    } else
      if (section.type == "key value") {
        sectionForm = <KeyValueForm stateProxy={section} />;
      } else {
        sectionForm = <TextForm stateProxy={section} />;
      }
  return <><SectionTitle sectionProxy={sectionWrapped} />{sectionForm}</>
}

export const Editor: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { t } = useTranslation("app");
  const state = useAppState();
  // This is hacky, but it works. 
  // It is easier than tracking status of flags used to fill steps
  const rerender = useRerender();

  // Subscribe to sections to render them properly below
  useSnapshot(state.resume.sections);

  let steps: Step[] = [{
    element: <><SectionTitle title={t`steps.personalInfo.title`} /><PersonalInformation /></>,
    id: "personal-info",
    onNext: () => {
      if (!state.resume.filledPersonalInformation) {
        state.resume.filledPersonalInformation = true;
        rerender();
      }
    },
  }];
  if (state.resume.filledPersonalInformation) {
    steps.push({
      element: <><SectionTitle title={t`steps.appearance.title`} /><Appearance /></>,
      id: "appearance",
      onNext: () => {
        if (!state.resume.filledAppearance) {
          state.resume.filledAppearance = true;
          rerender();
        }
      },
    });
  }
  if (state.resume.filledAppearance) {
    steps.push({
      element: <><SectionTitle title={t`newSection.title`} /><StepsForm /></>,
      id: "sections",
      onNext: () => {
        if (!state.resume.filledSections) {
          state.resume.filledSections = true;
          rerender();
        }
      },
    });
  }
  let previousSectionFilled = !!state.resume.filledSections;
  for (let i = 0; i < state.resume.sections.length && previousSectionFilled; i++) {
    let section = state.resume.sections[i]!;
    steps.push({
      element: renderSection(section),
      id: "section-" + section.id,
      onNext: () => {
        if (!section.filled) {
          section.filled = true;
          rerender();
        }
      },
    });
    previousSectionFilled = !!section.filled;
  }
  if (previousSectionFilled) {
    steps.push({
      element: <><SectionTitle title={t`steps.legalClause.title`} /><LegalClauseForm stateProxy={state.resume} /></>,
      id: "legal-clause",
      onNext: () => {
        if (!state.resume.filledLegalClause) {
          state.resume.filledLegalClause = true;
          rerender();
        }
      },
    });
  }
  if (state.resume.filledLegalClause) {
    steps.push({
      element: <><SectionTitle title={t`steps.export.title`} /><Export /></>,
      id: "export",
    });
  }

  return (
    <div className={cn(className, "relative flex flex-col gap-5 lg:gap-12")}>
      <Stepper maxSteps={5 + state.resume.sections.length} steps={steps} />
    </div>
  );
};
