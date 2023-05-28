import React, { useCallback } from "react";
import Image from "next/image";
import classes from "classnames";
import { Label } from "../../atoms/fields/label";
import { FlatSelect, FlatSelectOption } from "../../atoms/flatSelect";
import { PaperSize } from "../../../models/v1";
import placeholderCvImage from "../../../../public/images/cv.jpg";
import { useAppState } from "../../../state/store";
import { useSnapshot } from "valtio";
import { StepDescription } from "../../atoms/stepDescription";
import useTranslation from "next-translate/useTranslation";
import { templateDetails } from "../../../resumes/templateDetails";

export const TemplateList: React.FC<{
  template: string;
  setTemplate: (template: string) => void;
}> = ({ template, setTemplate }) => (
  <div>
    {/*TOOD: Accessibility*/}
    <Label name="Templates" />
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Object.entries(templateDetails).map(([name, { title }]) => {
        return (
          <div
            key={title}
            className="cursor-pointer relative rounded-xl"
            onClick={() => setTemplate(name)}>
            <Image
              className="bg-gray-100 rounded-xl border-solid border-2 border-b-0 border-gray-100 hover:border-blue-200"
              src={placeholderCvImage}
              alt="Template design"
            />
            <div
              className={classes(
                "text-base font-regular text-white capitalize absolute bottom-0 px-3 py-2 rounded-b-xl w-full",
                name === template ? "bg-blue-500" : "bg-blue-400",
              )}>
              {name === template && <div className="text-xs">Selected</div>}
              {title}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const pageOptions: FlatSelectOption<PaperSize>[] = [
  { value: "A4", label: "A4", description: "Popular in EU." },
  { value: "LETTER", label: "Letter", description: "Popular in US." },
];

export const Appearance: React.FC = React.memo(() => {
  const { t } = useTranslation("app");
  const settings = useAppState().resume.appearance;
  const { template, paperSize } = useSnapshot(settings);
  return (
    <>
      <StepDescription>{t`steps.appearance.description`}</StepDescription>
      <div className="mb-4">
        {/*TODO: Accessibility*/}
        <Label name="Page size" />
        <FlatSelect
          wrapperClassName="grid lg:grid-cols-2 grid-cols-1 gap-2"
          options={pageOptions}
          value={paperSize}
          onChange={v => (settings.paperSize = v)}
        />
      </div>
      <TemplateList template={template} setTemplate={v => (settings.template = v)} />
    </>
  );
});
