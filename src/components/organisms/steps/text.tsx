import useTranslation from "next-translate/useTranslation";
import { useSnapshot } from "valtio";
import { TextSection } from "../../../models/sections/textSection";
import { RichTextEditor } from "../../atoms/fields/richText";
import { StepDescription } from "../../atoms/stepDescription";

export const TextForm: React.FC<{ stateProxy: TextSection }> = ({ stateProxy }) => {
    const { t } = useTranslation("app");
    const { content } = useSnapshot(stateProxy)

    return (
        <>
            <StepDescription>{t`steps.text.description`}</StepDescription>
            <RichTextEditor long value={content} onChange={v => stateProxy.content = v} />
        </>
    )
}