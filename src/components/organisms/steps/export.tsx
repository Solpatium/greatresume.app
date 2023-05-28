import React from "react";
import { useAppState } from "../../../state/store";
import { useSnapshot } from "valtio";
import { StepDescription } from "../../atoms/stepDescription";
import useTranslation from "next-translate/useTranslation";
import { TemplateList } from "./appearance";
import { Button } from "../../atoms/button";

export const Export: React.FC = React.memo(() => {
    const { t } = useTranslation("app");
    const settings = useAppState().resume.appearance;
    const { template } = useSnapshot(settings);
    return (
        <>
            <StepDescription>{t`steps.export.description`}</StepDescription>
            <TemplateList template={template} setTemplate={v => (settings.template = v)} />
        </>
    );
});
