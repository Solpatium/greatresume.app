import React from "react";
import { Input } from "../../atoms/fields/input";
import { withId } from "../../../utils/lists";
import { FastEditableList } from "../../layout/flatEditableList";
import { useSnapshot } from "valtio";
import useTranslation from "next-translate/useTranslation";
import { StepDescription } from "../../atoms/stepDescription";
import { KeyValueSection, Entry } from "../../../models/sections/keyValueSection";

const Entry: React.FC<{ stateProxy: Entry }> = ({ stateProxy }) => {
  const { t } = useTranslation("app");
  const state = useSnapshot(stateProxy);
  return (
    <div className="flex gap-2 w-full">
    <Input
      className="my-3 w-full"
      label={t`steps.interests.interest`}
      onChange={(value) => (stateProxy.name = value)}
      value={state.name}
      />
      <Input
      className="my-3 w-full"
      label={t`steps.interests.interest`}
      onChange={(value) => (stateProxy.value = value)}
      value={state.value}
      />
      </div>
  );
};

export const KeyValueForm: React.FC<{ stateProxy: KeyValueSection }> = ({ stateProxy }) => {
  const { t } = useTranslation("app");
  return (
    <>
      <StepDescription>{t(`steps.${stateProxy.kind}.description`)}</StepDescription>
      <FastEditableList
        stateProxy={stateProxy.content}
        render={(e) => <Entry stateProxy={e} />}
        onAddNew={() => stateProxy.content.push(withId({ name: "", value: "" }))}
      />
    </>
  );
};
