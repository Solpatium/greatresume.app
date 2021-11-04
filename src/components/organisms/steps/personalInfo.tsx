import React from "react";
import { Input } from "../../atoms/fields/input";
import { useNestObjectState } from "../../../utils/mutators";
import { RichTextEditor } from "../../atoms/fields/richText";
import { PhotoEditor } from "../../molecules/photoEdit";
import { StepWrapper } from "../../molecules/stepWrapper";
import { FormStep } from "./types";
import { Label } from "../../atoms/fields/label";

export const PersonalInformation: FormStep = ({ imageDataUrl, state, setState, ...props }) => {
  const makeSetter = useNestObjectState(useNestObjectState(setState)("personalInformation"));
  const setImage = useNestObjectState(setState)("image");
  const formState = state.personalInformation;
  return (
    <StepWrapper {...props}>
      <Input
        label="Name"
        className="md:col-span-2"
        onChange={makeSetter("name")}
        value={formState["name"]}
      />
      <Input
        label="Last Name"
        className="md:col-span-2"
        onChange={makeSetter("surname")}
        value={formState["surname"]}
      />
      <Input
        label="Job Title"
        className="md:col-span-4"
        onChange={makeSetter("jobTitle")}
        value={formState["jobTitle"]}
      />
      <div className="row-start-1 md:row-end-3 md:col-span-2 md:col-start-5">
        <Label target="edit-image" name="Image" className="flex" />
        <PhotoEditor buttonId="edit-image" image={state.image} setImage={setImage} />
      </div>
      <RichTextEditor
        className="col-span-full"
        label="Short description"
        onChange={makeSetter("shortDescription")}
        value={formState["shortDescription"]}
      />
    </StepWrapper>
  );
};
