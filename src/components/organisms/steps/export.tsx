import React from "react";
import { usePersistentState, useAppState } from "../../../state/store";
import { useSnapshot } from "valtio";
import { StepDescription } from "../../atoms/typography";
import useTranslation from "next-translate/useTranslation";
import { TemplateList } from "./appearance";
import { Button } from "../../atoms/button";

export const Export: React.FC = React.memo(() => {
    const { t } = useTranslation("app");
    const settings = usePersistentState().resume.appearance;
    const { template } = useSnapshot(settings);
    const pdfState = useAppState().previewState;
    return (
        <>
            <StepDescription>{t`steps.export.description`}</StepDescription>
            <TemplateList template={template} setTemplate={v => {
                settings.template = v;
                pdfState.previewVisible = !pdfState.previewVisible;
            }} />
        </>
    );
});
