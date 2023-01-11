import React from "react";
import { Input } from "../../atoms/fields/input";
import { withId } from "../../../utils/lists";
import { FastEditableList } from "../../layout/flatEditableList";
import { SimpleListEntry } from "../../../models/sections/simpleListSection";
import { useSnapshot } from "valtio";
import useTranslation from "next-translate/useTranslation";
import { StepDescription } from "../../atoms/stepDescription";

const Entry: React.FC<{ stateProxy: SimpleListEntry }> = ({ stateProxy }) => {
  const { t } = useTranslation("app");
  const state = useSnapshot(stateProxy);
  return (
    <Input
      className="my-3 w-full max-w-[250px]"
      label={t`steps.interests.interest`}
      onChange={(value) => (stateProxy.content = value)}
      value={state.content}
    />
  );
};

export const InterestsForm: React.FC<{ stateProxy: SimpleListEntry[] }> = ({ stateProxy }) => {
  const { t } = useTranslation("app");
  return (
    <>
      <StepDescription>{t`steps.interests.description`}</StepDescription>
      <FastEditableList
        stateProxy={stateProxy}
        render={(e) => <Entry stateProxy={e} />}
        onAddNew={() => stateProxy.push(withId({ content: "" }))}
      />
    </>
  );
};
