import React, { useCallback } from "react";
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
      name="link-name[]"
      onChange={(value) => (stateProxy.name = value)}
      value={state.name}
    />
    <Input
      className="w-full"
      label={t`url`}
      name="link-value[]"
      onChange={(value) => (stateProxy.value = value)}
      value={state.value}
    />
  </div>
  )
}

const entryToLinkEdit = (data: Entry) => <LinkEdit stateProxy={data} />;

export const PersonalInformation: React.FC = React.memo(() => {
  const { t } = useTranslation("app");
  const resumeProxy = useAppState().resume;
  const stateProxy = resumeProxy.personalInformation;
  const state = useSnapshot(stateProxy);
  const { image } = useSnapshot(resumeProxy.appearance);
  const addNew = useCallback(() => stateProxy.links.push(withId({ name: "", value: "" })), [stateProxy.links]);

  const setImage = useCallback((v?: string) => (resumeProxy.appearance.image = v), [resumeProxy.appearance]);
  return (
    <>
      <div className="grid md:grid-cols-6 gap-4">
        <Input
          label={t`name`}
          name="name"
          autocomplete="given-name"
          className="md:col-span-2"
          onChange={v => (stateProxy.name = v)}
          value={state["name"]}
        />
        <Input
          label={t`surname`}
          name="surname"
          autocomplete="family-name"
          className="md:col-span-2"
          onChange={v => (stateProxy.surname = v)}
          value={state["surname"]}
        />
        <Input
          label={t`jobTitle`}
          name="job-title"
          className="md:col-span-4"
          onChange={v => (stateProxy.jobTitle = v)}
          value={state["jobTitle"]}
        />
        <div className="row-start-1 md:row-end-3 md:col-span-2 md:col-start-5">
          <Label target="edit-image" name={t`photo`} className="flex" />
          <PhotoEditor
            buttonId="edit-image"
            image={image}
            setImage={setImage}
          />
        </div>
        <Input
          label={t`phone`}
          name="phone"
          type="tel"
          autocomplete="tel"
          className="md:col-span-3"
          onChange={v => (stateProxy.phone = v)}
          value={state["phone"]}
        />
        <Input
          label={t`email`}
          name="email"
          type="email"
          autocomplete="email"
          className="md:col-span-3"
          onChange={v => (stateProxy.email = v)}
          value={state["email"]}
        />
        <FastEditableList
          label={t`links`}
          className="col-span-full" z
          stateProxy={stateProxy.links}
          render={entryToLinkEdit}
          onAddNew={addNew} />
      </div>
    </>
  );
});
