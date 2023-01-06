import React, { useState } from "react";
import { Input } from "../../atoms/fields/input";
import { Section } from "../../../models/v1";
import { StateSetter, useNestArrayState, useNestObjectState } from "../../../utils/mutators";

import { SortableList } from "../../layout/sortableList";
import { FormStep } from "./types";
import { StepWrapper } from "../../molecules/stepWrapper";
import { Modal } from "../../layout/modal";

import { kindIcons, SectionPicker } from "../../molecules/sectionPicker";
import useTranslation from "next-translate/useTranslation";

const Entry: React.FC<{ state: Section; setState: StateSetter<Section> }> = ({
  state,
  setState,
}) => {
  const makeSetter = useNestObjectState(setState);
  return (
    <>
      <Input
        className="col-span-1"
        label="Title"
        onChange={makeSetter("title")}
        value={state["title"]}
      />
    </>
  );
};

const Preview: React.FC<{ state: Section }> = ({ state }) => {
  const Icon = kindIcons[state.section.kind];
  return (
    <div className="flex flex-row items-center gap-2">
      <Icon className="w-6 h-6" />
      <p>{state.title}</p>
    </div>
  );
};

export const StepsForm: FormStep = ({ state, setState, ...props }) => {
  const { t } = useTranslation("app");
  const entriesSetter = useNestObjectState(setState)("sections");
  const makeEntrySetter = useNestArrayState(entriesSetter);
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <>
      {modalOpened && (
        <Modal title={t`newSection.modalTitle`} onClose={() => setModalOpened(false)}>
          <SectionPicker
            onSelect={newSection => {
              entriesSetter(entries => [...entries, newSection]);
              setModalOpened(false);
            }}
          />
        </Modal>
      )}
      <StepWrapper {...props}>
        <p className="col-span-full text-md font-medium text-gray-900">{t`newSection.description`}</p>
        <SortableList
          className="col-span-full"
          state={state.sections}
          setState={entriesSetter}
          render={(e, i) => <Entry state={e} setState={makeEntrySetter(i)} />}
          renderPreview={content => <Preview state={content} />}
          onAddNew={() => setModalOpened(true)}
        />
      </StepWrapper>
    </>
  );
};
