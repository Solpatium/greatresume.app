import useTranslation from "next-translate/useTranslation";
import React, { useCallback } from "react";
import { useSnapshot } from "valtio";
import {
  Entry,
  ExperienceKind,
  ExperienceSection,
  makeEmptyEntry,
} from "../../../models/sections/experienceSection";
import { Input } from "../../atoms/fields/input";
import { RichTextEditor } from "../../atoms/fields/richText";
import { StepDescription } from "../../atoms/typography";
import { ExpandableList } from "../../layout/expandableList";
import { UncontrolledSortableList } from "../../layout/sortableList";
import { SectionTitle } from "../../molecules/sectionTitle";
import { Entry as SectionEntryTitle } from "./sections";
import { isExperienceEntryFilled } from "../../../models/v1";
import { Button } from "../../atoms/button";

const Entry: React.FC<{ kind: ExperienceKind; stateProxy: Entry }> = ({ kind, stateProxy }) => {
  const state = useSnapshot(stateProxy);
  const { t } = useTranslation("app");

  return (
    <>
      <div className="flex gap-4">
        <Input
          className="md:col-span-1 grow"
          label={t`startDate`}
          onChange={v => (stateProxy.from = v)}
          value={state["from"]}
        />
        <Input
          className="md:col-span-1 grow"
          label={t`endDate`}
          onChange={v => (stateProxy.to = v)}
          value={state["to"]}
        />
      </div>
      <Input
        className="col-span-full"
        label={t(`steps.${kind}.entryTitle`)}
        onChange={v => (stateProxy.title = v)}
        value={state["title"]}
      />
      <Input
        className="col-span-full"
        label={t(`steps.${kind}.entrySubtitle`)}
        onChange={v => (stateProxy.subtitle = v)}
        value={state["subtitle"]}
      />
      <RichTextEditor
        className="col-span-full"
        label={t`description`}
        onChange={v => (stateProxy.description = v)}
        value={state["description"]}
      />
    </>
  );
};

const joinNonEmpty = (joinWith: string, ...args: string[]): string =>
  args.filter(v => v.trim()).join(joinWith);

const Preview: React.FC<{ stateProxy: Entry }> = ({ stateProxy }) => {
  const { t } = useTranslation("app");
  const state = useSnapshot(stateProxy);
  const parts = [];

  if (state.from || state.to) {
    parts.push(
      <span key="date" className="italic text-base inline-block mr-2">
        {joinNonEmpty(" - ", state.from, state.to)}
      </span>,
    );
  }

  if (state.title || state.subtitle) {
    parts.push(
      <span key="title" className="inline-block font-semibold text-base truncate">
        {joinNonEmpty(" : ", state.title, state.subtitle)}
      </span>,
    );
  }

  if (!parts.length) {
    parts.push(<span key="empty" className="italic text-base truncate">{t`empty`}</span>)
  }

  return <div className="w-full">
    <div className="truncate flex items-center">{parts}</div>
  </div>;
};

export const Experience: React.FC<{
  stateProxy: ExperienceSection;
}> = React.memo(({ stateProxy }) => {
  const { t } = useTranslation("app");
  const confirmDeletion = useCallback((entry: Entry) => {
    return isExperienceEntryFilled(entry) === false || confirm(t`entryDeletionConfirmation`); 
  }, [t]);
  return (
    <ExpandableList
      itemClassName="sm:p-5 bg-white"
      stateProxy={stateProxy.content}
        renderPreview={stateProxy => <Preview stateProxy={stateProxy} />}
        mobileTitle={<div className="mb-4"><SectionEntryTitle state={stateProxy}/></div>}
        render={e => <Entry stateProxy={e} kind={stateProxy.kind} />}
        className="col-span-full"
        onAddNew={() => {
          stateProxy.content.push(makeEmptyEntry());
        }}
        confirmDeletion={confirmDeletion}
    />);
});
