import React from "react";
import { Input } from "../../atoms/fields/input";
import { ExpandableList } from "../../layout/expandableList";
import { RichTextEditor } from "../../atoms/fields/richText";
import {
  Entry,
  ExperienceKind,
  ExperienceSection,
  makeEmptyEntry,
} from "../../../models/sections/experienceSection";
import { useSnapshot } from "valtio";
import { StepDescription } from "../../atoms/stepDescription";
import useTranslation from "next-translate/useTranslation";

const Entry: React.FC<{ kind: ExperienceKind; stateProxy: Entry }> = ({ kind, stateProxy }) => {
  const state = useSnapshot(stateProxy);
  const { t } = useTranslation("app");

  return (
    <>
      <Input
        className="md:col-span-1"
        label={t`startDate`}
        onChange={v => (stateProxy.from = v)}
        value={state["from"]}
      />
      <Input
        className="md:col-span-1"
        label={t`endDate`}
        onChange={v => (stateProxy.to = v)}
        value={state["to"]}
      />
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
      <Input
        className="col-span-full"
        label={t`url`}
        onChange={v => (stateProxy.url = v)}
        value={state["url"]}
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
  const {t} = useTranslation("app");
  const state = useSnapshot(stateProxy);
  const parts = [];

  if (state.from || state.to) {
    parts.push(
      <span className="italic text-base inline-block mr-2">
        {joinNonEmpty(" - ", state.from, state.to)}
      </span>,
    );
  }

  if (state.title || state.subtitle) {
    parts.push(
      <span className="inline-block font-semibold text-base">
        {joinNonEmpty(" : ", state.title, state.subtitle)}
      </span>,
    );
  }

  if (!parts.length) {
    parts.push(<span className="italic text-base">{t`empty`}</span>)
  }

  return <div>{parts}</div>;
};

export const Experience: React.FC<{
  stateProxy: ExperienceSection;
}> = React.memo(({ stateProxy }) => {
  const { t } = useTranslation("app");
  return (
    <>
      <StepDescription>{t(`steps.${stateProxy.kind}.description`)}</StepDescription>
      <ExpandableList
        // label="Entries"
        stateProxy={stateProxy.content}
        renderPreview={stateProxy => <Preview stateProxy={stateProxy} />}
        render={e => <Entry stateProxy={e} kind={stateProxy.kind} />}
        className="col-span-full"
        onAddNew={() => {
          stateProxy.content.push(makeEmptyEntry());
        }}
      />
    </>
  );
});
