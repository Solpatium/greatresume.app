import React, { useState } from "react";
import { Input } from "../../atoms/fields/input";
import { Section } from "../../../models/v1";

import { ExpandableList } from "../../layout/expandableList";
import { Modal } from "../../layout/modal";

import { kindIcons, SectionPicker } from "../../molecules/sectionPicker";
import useTranslation from "next-translate/useTranslation";
import { useAppState } from "../../../state/store";
import { useSnapshot } from "valtio";
import { StepDescription } from "../../atoms/stepDescription";

const Entry: React.FC<{ state: Section }> = ({ state }) => {
  const { title } = useSnapshot(state);
  return (
    <Input
      className="col-span-1"
      label="Title"
      onChange={value => (state.title = value)}
      value={title}
    />
  );
};

const Preview: React.FC<{ state: Section }> = ({ state }) => {
  const { title, section } = useSnapshot(state);
  const { kind } = section;
  const Icon = kindIcons[kind];

  return (
    <div className="flex flex-row items-center gap-2">
      <Icon className="w-6 h-6" />
      <p>{title}</p>
    </div>
  );
};

export const StepsForm: React.FC = () => {
  const { t } = useTranslation("app");
  const { sections } = useAppState().resume;

  const [modalOpened, setModalOpened] = useState(false);
  return (
    <>
      {modalOpened && (
        <Modal title={t`newSection.modalTitle`} onClose={() => setModalOpened(false)}>
          <SectionPicker
            onSelect={newSection => {
              sections.push(newSection);
              setModalOpened(false);
            }}
          />
        </Modal>
      )}
      <StepDescription>{t`newSection.description`}</StepDescription>
      <ExpandableList
        className="col-span-full"
        stateProxy={sections}
        render={e => <Entry state={e} />}
        renderPreview={content => <Preview state={content} />}
        onAddNew={() => setModalOpened(true)}
      />
    </>
  );
};
