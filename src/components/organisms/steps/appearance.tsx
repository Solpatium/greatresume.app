import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import classes from "classnames";
import { Label, labelTextStyle } from "../../atoms/fields/label";
import { FlatSelect, FlatSelectOption } from "../../atoms/flatSelect";
import { PaperSize } from "../../../models/v1";
import { usePersistentState, useAppState } from "../../../state/store";
import { useSnapshot } from "valtio";
import { StepDescription } from "../../atoms/typography";
import useTranslation from "next-translate/useTranslation";
import { useTemplateDetails } from "../../../resumes/templateDetails";
import { RadioGroup } from "@headlessui/react";

export const TemplateList: React.FC<{
  template: string;
  setTemplate: (template: string) => void;
}> = ({ template, setTemplate }) => {
  const { t } = useTranslation("app");
  const templates = useTemplateDetails();
  return (
    <RadioGroup value={template} onChange={setTemplate}>
      <RadioGroup.Label className={labelTextStyle}>{t`listOfTemplates`}</RadioGroup.Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(templates).map(([name, { title, image, description }]) => {
          return (
            <RadioGroup.Option
              value={name}
              key={title}
              className="cursor-pointer relative rounded-xl"
            >
              <Image
                className="bg-gray-100 rounded-xl border-solid border-2 border-b-0 border-gray-100 hover:border-blue-200"
                src={image}
                aria-hidden
                alt="" />
              <div
                className={classes(
                  "text-base font-regular text-white capitalize absolute bottom-0 px-3 py-2 rounded-b-xl w-full",
                  name === template ? "bg-blue-500" : "bg-blue-400"
                )}
                >
                {name === template && <div aria-hidden className="text-xs">{t("selected")}</div>}
                {title}
              </div>
              <p className="sr-only">{description}</p>
            </RadioGroup.Option>
          );
        })}
      </div>
    </RadioGroup>
  );
};

export const Appearance: React.FC = React.memo(() => {
  const { t } = useTranslation("app");
  const settings = usePersistentState().resume.appearance;
  const { template, paperSize } = useSnapshot(settings);
  const options = useMemo(() => [
    { value: "A4", label: t("paper.a4"), description: t("paper.a4Description") },
    { value: "LETTER", label: t("paper.letter"), description: t("paper.letterDescription") },
  ] as FlatSelectOption<PaperSize>[], [t]);
  const pdfState = useAppState().previewState;
  const togglePreview = () => {
    pdfState.previewVisible = !pdfState.previewVisible;
  };
  return (
    <>
      <StepDescription>{t`steps.appearance.description`}</StepDescription>
      <div className="mb-4">
        <FlatSelect
          label={t("pageSize")}
          wrapperClassName="grid grid-cols-2 gap-2"
          options={options}
          value={paperSize}
          onChange={v => { settings.paperSize = v; togglePreview(); }}
        />
      </div>
      <TemplateList template={template} setTemplate={v => { settings.template = v; togglePreview(); }} />
    </>
  );
});
