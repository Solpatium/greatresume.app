import React, { useState } from "react";
import { createEmptySection, Section, SectionKind } from "../../models/v1";
import { Label } from "../atoms/fields/label";
import { FlatSelect, FlatSelectOption } from "../atoms/flatSelect";
import {
  BookOpenIcon,
  BriefcaseIcon,
  GlobeEuropeAfricaIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  LanguageIcon,
  PaintBrushIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import useTranslation from "next-translate/useTranslation";

export const kindIcons: Record<SectionKind, React.FC<React.ComponentProps<"svg">>> = {
  employment: BriefcaseIcon,
  education: BookOpenIcon,
  projects: WrenchScrewdriverIcon,
  experience: GlobeEuropeAfricaIcon,
  skills: ClipboardDocumentListIcon,
  languages: LanguageIcon,
  interests: PaintBrushIcon,
  text: DocumentTextIcon,
};

export const SectionPicker: React.FC<{ onSelect: (value: Section) => void }> = ({ onSelect }) => {
  const { t } = useTranslation("app");

  const mainOptions: FlatSelectOption<SectionKind>[] = [
    {
      value: "employment",
      label: t`newSection.sections.employment.label`,
      description: t`newSection.sections.employment.description`,
      icon: BriefcaseIcon,
    },
    {
      value: "education",
      label: t`newSection.sections.education.label`,
      description: t`newSection.sections.education.description`,
      icon: BookOpenIcon,
    },
    {
      value: "projects",
      label: t`newSection.sections.projects.label`,
      description: t`newSection.sections.projects.description`,
      icon: WrenchScrewdriverIcon,
    },
    {
      value: "experience",
      label: t`newSection.sections.experience.label`,
      description: t`newSection.sections.experience.description`,
      icon: GlobeEuropeAfricaIcon,
    },
    {
      value: "skills",
      label: t`newSection.sections.skills.label`,
      description: t`newSection.sections.skills.description`,
      icon: ClipboardDocumentListIcon,
    },
    {
      value: "languages",
      label: t`newSection.sections.languages.label`,
      description: t`newSection.sections.languages.description`,
      icon: LanguageIcon,
    },
    {
      value: "interests",
      label: t`newSection.sections.interests.label`,
      description: t`newSection.sections.interests.description`,
      icon: PaintBrushIcon,
    },
    {
      value: "text",
      label: t`newSection.sections.text.label`,
      description: t`newSection.sections.text.description`,
      icon: DocumentTextIcon,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
        <FlatSelect
          label={t`newSection.sections.label`}
          wrapperClassName="grid grid-cols-2 gap-2"
          options={mainOptions}
          value={undefined}
          onChange={(sectionKind) => {
            if (sectionKind) {
              onSelect(createEmptySection(t(`defaults.titles.${sectionKind}`), sectionKind));
            }
          }}
        />
    </div>
  );
};
