import React, { useCallback, useState } from "react";
import { Input } from "../../atoms/fields/input";
import { isSectionFilled, Section } from "../../../models/v1";

import { kindIcons, SectionPicker } from "../../molecules/sectionPicker";
import useTranslation from "next-translate/useTranslation";
import { usePersistentState } from "../../../state/store";
import { useSnapshot } from "valtio";
import { StepDescription } from "../../atoms/typography";
import { FastEditableList } from "../../layout/flatEditableList";
import { Button } from "../../atoms/button";
import { highlight } from "pdfkit";
import { highlightElement } from "../../../utils/highlight";
import { BigModal } from "../../layout/bigModal";
import { ExpandableItem, useOpenTracking } from "../../layout/expandableList";
import { Experience } from "./experience";
import { InterestsForm } from "./interests";
import { KeyValueForm } from "./keyValue";
import { TextForm } from "./text";
import { PlusCircleIcon, PlusIcon, RectangleGroupIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import { SectionTitle } from "../../molecules/sectionTitle";
import { ControlledSortableList, SortingToggle } from "../../layout/sortableList";
import { useToggle } from "react-use";
import cn from "classnames";


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

export const Entry: React.FC<{ state: Section }> = React.memo(({ state }) => {
  const { t } = useTranslation("app");
  const { kind } = state;
  const Icon = kindIcons[kind];
  const section = useSnapshot(state);
  return (
    <>
      <div className="flex items-center mr-4 gap-4 overflow-hidden">
        <Icon className="w-8 h-8" />
        <div className="text-md font-semibold text-slate-700 truncate">{section.title}</div>
      </div>
    </>
  );
});

const TitleEdit: React.FC<{ section: Section }> = ({ section }) => {
  const snapshot = useSnapshot(section);
  return <Input
    className="lg:max-w-[50%] mb-4"
    label="Title" 
    value={snapshot.title}
    onChange={v => { section.title = v; }} />;
}

const Edit: React.FC<{ section: Section }> = ({ section }) => {
  const { t } = useTranslation("app");

  return <div className="md:p-5 md:pt-0 md:-mt-2 min-w-0">
    <TitleEdit section={section} />
    {/* <StepDescription>{t(`steps.${section.kind}.description`)}</StepDescription> */}
    {renderSection(section)}
  </div>
}

const confirmDeletion = (section: Section, text: string): boolean => {
  if (!isSectionFilled(section)) {
    // No confirmation needed.
    return true;
  }

  return confirm(text);
}

export const StepsForm: React.FC = React.memo(() => {
  const { t } = useTranslation("app");
  const { sections } = usePersistentState().resume;

  const openTracking = useOpenTracking();

  const [modalOpened, setModalOpened] = useState(false);
  const [sorting, toggleSorting] = useToggle(false);
  const onDelete = useCallback(
    (index: number) => {
      if (!sections[index] || !confirmDeletion(sections[index]!, t`newSection.deletionConfirmation`)) {
        return;
      } 
      openTracking.remove(sections[index]?.id ?? "");
      sections.splice(index, 1);
      if (sections.length === 0) {
        toggleSorting(false);
      }
    },
    [sections, t],
  );
  const snapshot = useSnapshot(sections);

  const openSections = useSnapshot(openTracking.stateProxy);
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <SectionTitle title={t`newSection.title`} />
        {snapshot.length > 0 &&
          <SortingToggle enabled={sorting} toggle={() => {
            toggleSorting();
            openTracking.removeAll();
          }} />
        }
      </div>
      {
        <BigModal historyKey="sectionPicker" show={modalOpened} title={t`newSection.modalTitle`} onClose={() => setModalOpened(false)}>
          <SectionPicker
            onSelect={newSection => {
              sections.push(newSection);
              openTracking.add(newSection.id);
              setModalOpened(false);
            }}
          />
        </BigModal>
      }
      <StepDescription>{t`newSection.description`}</StepDescription>
      <ControlledSortableList
        stateProxy={sections}
        sortingEnabled={sorting}
        itemClassName="border-0 p-0 my-0 bg-gray-50 rounded-2xl mb-2"
        onDelete={onDelete}
        render={(s, i) => (
          <ExpandableItem
            stateProxy={s}
            onDelete={onDelete}
            className="p-5"
            render={e => <Edit section={e} />}
            renderPreview={e => <Entry state={e} />}
            // TODO: Why do we need this?
            name={s.title}
            index={i}
            id={s.id}
            onToggle={openTracking.toggle}
            open={openSections[s.id]}
            // className="p-3"
          />
        )}
      />
      <Button onClick={() => { setModalOpened(true) }} icon={PlusIcon} className="sm:p-4 sm:px-6" disabled={sorting}>
        <span className="text-base font-bold">{t("newSection.addNew")}</span>
      </Button>
    </>
  );
});
