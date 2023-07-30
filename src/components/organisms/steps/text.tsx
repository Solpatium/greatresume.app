import useTranslation from "next-translate/useTranslation";
import { useSnapshot } from "valtio";
import { TextSection } from "../../../models/sections/textSection";
import { RichTextEditor } from "../../atoms/fields/richText";
import { StepDescription } from "../../atoms/typography";
import React from "react";
import { SectionTitle } from "../../molecules/sectionTitle";

export const TextForm: React.FC<{ stateProxy: TextSection }> = React.memo(({ stateProxy }) => {
    const { t } = useTranslation("app");
    const { content } = useSnapshot(stateProxy)

    return (
        <>
            <SectionTitle sectionProxy={stateProxy} />
            <StepDescription>{t`steps.text.description`}</StepDescription>
            <RichTextEditor long value={content} onChange={v => stateProxy.content = v} />
        </>
    )
});