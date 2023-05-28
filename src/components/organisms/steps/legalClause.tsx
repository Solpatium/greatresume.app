import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useSnapshot } from "valtio";
import { ResumeModel } from "../../../models/v1";
import { RichTextEditor } from "../../atoms/fields/richText";
import { StepDescription } from "../../atoms/stepDescription";

export const LegalClauseForm: React.FC<{ stateProxy: ResumeModel }> = React.memo(({ stateProxy }) => {
  const { t } = useTranslation("app")
  const value = useSnapshot(stateProxy).legalClause;
  return (
    <>
      <StepDescription>{t`steps.legalClause.description`}</StepDescription>
      <RichTextEditor
        long
        onChange={v => stateProxy.legalClause = v}
        value={value}
      />
    </>
  );
});
