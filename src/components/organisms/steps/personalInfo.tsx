import React from "react";
import { Input } from "../../atoms/fields/input";
import { PhotoEditor } from "../../molecules/photoEdit";
import { Label } from "../../atoms/fields/label";
import { useAppState } from "../../../state/store";
import { useSnapshot } from "valtio";
import { FastEditableList } from "../../layout/flatEditableList";
import { Entry } from "../../../models/sections/keyValueSection";
import useTranslation from "next-translate/useTranslation";
import { withId } from "../../../utils/lists";

export const LinkEdit: React.FC<{ stateProxy: Entry }> = ({ stateProxy }) => {
  const { t } = useTranslation("app");
  const state = useSnapshot(stateProxy);
  return (<div className="flex flex-col gap-3 md:flex-row md:gap-2 my-3 w-full">
    <Input
      className="w-full"
      label={t`linkName`}
      onChange={(value) => (stateProxy.name = value)}
      value={state.name}
    />
    <Input
      className="w-full"
      label={t`url`}
      onChange={(value) => (stateProxy.value = value)}
      value={state.value}
    />
  </div>
  )
}

export const PersonalInformation: React.FC = () => {
  const { t } = useTranslation("app");
  const resumeProxy = useAppState().resume;
  const stateProxy = resumeProxy.personalInformation;
  const state = useSnapshot(stateProxy);
  const { image } = useSnapshot(resumeProxy.appearance);

  return (
    <>
      <div className="grid md:grid-cols-6 gap-4">
        <Input
          label={t`name`}
          className="md:col-span-2"
          onChange={v => (stateProxy.name = v)}
          value={state["name"]}
        />
        <Input
          label={t`surname`}
          className="md:col-span-2"
          onChange={v => (stateProxy.surname = v)}
          value={state["surname"]}
        />
        <Input
          label={t`jobTitle`}
          className="md:col-span-4"
          onChange={v => (stateProxy.jobTitle = v)}
          value={state["jobTitle"]}
        />
        <div className="row-start-1 md:row-end-3 md:col-span-2 md:col-start-5">
          <Label target="edit-image" name={t`photo`} className="flex" />
          <PhotoEditor
            buttonId="edit-image"
            image={image}
            setImage={v => (resumeProxy.appearance.image = v)}
          />
        </div>
        <Input
          label={t`phone`}
          className="md:col-span-3"
          onChange={v => (stateProxy.phone = v)}
          value={state["phone"]}
        />
        <Input
          label={t`email`}
          className="md:col-span-3"
          onChange={v => (stateProxy.email = v)}
          value={state["email"]}
        />
        <FastEditableList
          label={t`links`}
          className="col-span-full"
          stateProxy={stateProxy.links}
          render={data => <LinkEdit stateProxy={data} />}
          onAddNew={() => stateProxy.links.push(withId({ name: "", value: "" }))} />
      </div>
    </>
  );
};
