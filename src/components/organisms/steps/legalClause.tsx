import React from "react";
import { useNestObjectState } from "../../../utils/mutators";
import { RichTextEditor } from "../../atoms/fields/richText";
import { StepWrapper } from "../../molecules/stepWrapper";
import { FormStep } from "./types";

export const LegalClauseForm: FormStep = ({ imageDataUrl, state, setState, ...props }) => {
  const value = state.legalClause;
  const setValue = useNestObjectState(setState)("legalClause");
  return (
    <StepWrapper {...props}>
      <RichTextEditor className="col-span-full" label="Content" onChange={setValue} value={value} />
    </StepWrapper>
  );
};
