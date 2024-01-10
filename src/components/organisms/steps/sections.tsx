import React, { useCallback, useState } from "react";
import { Input } from "../../atoms/fields/input";
import { Section } from "../../../models/v1";

import { kindIcons, SectionPicker } from "../../molecules/sectionPicker";
import useTranslation from "next-translate/useTranslation";
import { useAppState } from "../../../state/store";
import { useSnapshot } from "valtio";
import { StepDescription } from "../../atoms/typography";
import { FastEditableList } from "../../layout/flatEditableList";
import { Button } from "../../atoms/button";
import { highlight } from "pdfkit";
import { highlightElement } from "../../../utils/highlight";
import { BigModal } from "../../layout/bigModal";
import { ExpandableItem, ExpandableList, useOpenTracking } from "../../layout/expandableList";
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

const Entry: React.FC<{ state: Section }> = React.memo(({ state }) => {
  const { t } = useTranslation("app");
  const { kind } = state;
  const Icon = kindIcons[kind];
  const section = useSnapshot(state);
  return (
    <>
      <div className="flex lg:py-4 items-center mr-4 gap-4 overflow-hidden">
        <Icon className="w-8 h-8" />
        <div className="text-md font-semibold text-slate-700 truncate">{section.title}</div>
      </div>
    </>
  );
});

export const SectionPreviewTmp = Entry;

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

  return <>
    <TitleEdit section={section} />
    {/* <StepDescription>{t(`steps.${section.kind}.description`)}</StepDescription> */}
    {renderSection(section)}
  </>
}

export const StepsForm: React.FC = React.memo(() => {
  const { t } = useTranslation("app");
  const { sections } = useAppState().resume;

  const openTracking = useOpenTracking();

  const [modalOpened, setModalOpened] = useState(false);
  const [sorting, toggleSorting] = useToggle(false);
  const onDelete = useCallback(
    (index: number) => {
      openTracking.remove(sections[index]?.id ?? "");
      sections.splice(index, 1);
      if (sections.length === 0) {
        toggleSorting(false);
      }
    },
    [sections],
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
        <BigModal show={modalOpened} title={t`newSection.modalTitle`} onClose={() => setModalOpened(false)}>
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
        itemClassName="border-0 p-0 my-0"
        onDelete={onDelete}
        render={(s, i) => (
          <ExpandableItem
            stateProxy={s}
            onDelete={onDelete}
            render={e => <div className="lg:px-3 lg:pb-6 lg:-mt-3"><Edit section={e} /></div>}
            renderPreview={e => <Entry state={e} />}
            // TODO: Why do we need this?
            name={s.title}
            index={i}
            id={s.id}
            onToggle={openTracking.toggle}
            open={openSections[s.id]}
            className="p-3"
          />
        )}
        divider={<div className="w-full h-[1px] bg-gray-400	"/>}
      />
      <button
        type="button"
        onClick={() => { setModalOpened(true) }} disabled={sorting}
        className={
          cn("mt-6 flex justify-left w-full border-dashed	border-[1px] rounded-lg gap-2 items-center border-dashed border-gray-400 focus:ring-indigo-500 text-gray-700 p-4", 
          sorting ? "opacity-60" : "hover:bg-blue-50",
          "bg-sky-50 rounded-lg lg:max-w-[50%]")}
      >
        <PlusIcon className="w-6 -mt-[2px]" />
        <span className="text-base font-bold">{t("newSection.addNew")}</span>
      </button> 
    </>
  );
});
