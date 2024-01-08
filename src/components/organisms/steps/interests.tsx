import React from "react";
import { Input } from "../../atoms/fields/input";
import { withId } from "../../../utils/lists";
import { FastEditableList } from "../../layout/flatEditableList";
import { SimpleListEntry, SimpleListSection } from "../../../models/sections/simpleListSection";
import { useSnapshot } from "valtio";
import useTranslation from "next-translate/useTranslation";
import { StepDescription } from "../../atoms/typography";
import { useToggle } from "react-use";
import { SectionTitle } from "../../molecules/sectionTitle";

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

export const InterestsForm: React.FC<{ stateProxy: SimpleListSection }> = React.memo(({ stateProxy }) => {
  const { t } = useTranslation("app");
  return (
    <>
      <FastEditableList
        stateProxy={stateProxy.content}
        render={(e) => <Entry stateProxy={e} />}
        onAddNew={() => stateProxy.content.push(withId({ content: "" }))}
      />
    </>
  );
});
