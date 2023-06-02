import React, { useState } from "react";
import { Input } from "../../atoms/fields/input";
import { Section } from "../../../models/v1";

import { Modal } from "../../layout/modal";

import { kindIcons, SectionPicker } from "../../molecules/sectionPicker";
import useTranslation from "next-translate/useTranslation";
import { useAppState } from "../../../state/store";
import { useSnapshot } from "valtio";
import { StepDescription } from "../../atoms/stepDescription";
import { FastEditableList } from "../../layout/flatEditableList";
import { Button } from "../../atoms/button";
import { highlight } from "pdfkit";
import { highlightElement } from "../../../utils/highlight";

const Entry: React.FC<{ state: Section }> = React.memo(({ state }) => {
  const { t } = useTranslation("app");
  const { title, section } = useSnapshot(state);
  const { kind } = section;
  const Icon = kindIcons[kind];
  return (
    <>
      <div className="flex py-4 items-center ml-2 mr-4 gap-4 overflow-hidden">
        <Icon className="w-8 h-8" />
        <div className="text-md font-semibold text-slate-700 truncate">{state.title}</div>
        {/* <div className="align-self-end"><Button onClick={() => {
          const section = document.getElementById("section-" + state.id);
          if (!section) {
            return;
          }
          section.scrollIntoView({ behavior: "smooth" });
          highlightElement(section);
        }}>Edit</Button></div> */}
      </div>
    </>
  );
});

export const StepsForm: React.FC = React.memo(() => {
  const { t } = useTranslation("app");
  const { sections } = useAppState().resume;

  const [modalOpened, setModalOpened] = useState(false);
  return (
    <>
      {modalOpened && (
        <Modal title={t`newSection.modalTitle`} onClose={() => setModalOpened(false)}>
          <SectionPicker
            onSelect={newSection => {
              // We should show it right away if all sections are filled.
              newSection.filled = sections[sections.length-1]?.filled;
              sections.push(newSection);
              setModalOpened(false);
            }}
          />
        </Modal>
      )}
      <StepDescription>{t`newSection.description`}</StepDescription>
      <FastEditableList
        stateProxy={sections}
        render={e => <Entry state={e} />}
        onAddNew={() => setModalOpened(true)}
        deletionConfirmation={t`newSection.deletionConfirmation`}
        buttonText={t`newSection.addNew`}
      />
    </>
  );
});
