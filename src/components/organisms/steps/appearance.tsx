import React from "react";
import { FormStep } from "./types";
import { templates } from "../../../resumes";
import Image from "next/image";
import classes from "classnames";
import { Label } from "../../atoms/fields/label";
import { FlatSelect, FlatSelectOption } from "../../atoms/flatSelect";
import { PaperSize } from "../../../models/v1";
import placeholderCvImage from "../../../../public/images/cv.jpg";
import { useAppState } from "../../../state/store";
import { useSnapshot } from "valtio";

const TemplateList: React.FC<{
  template: string;
  setTemplate: (template: string) => void;
}> = ({ template, setTemplate }) => (
  <div className="col-span-full">
    {/*TOOD: Accessibility*/}
    <Label name="Templates" />
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Object.entries(templates).map(([name, { title }]) => {
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

export const Appearance: FormStep = () => {
  // const { template, paperSize } = useReadState().resume;
  const resume = useAppState().resume;
  const { template, paperSize } = useSnapshot(resume);
  return (
    <>
      <div className="col-span-full">
        <div className="mb-4">
          {/*TODO: Accessibility*/}
          <Label name="Page size" />
          <FlatSelect
            wrapperClassName="grid lg:grid-cols-2 grid-cols-1 gap-2"
            options={pageOptions}
            value={paperSize}
            onChange={v => (resume.paperSize = v)}
          />
        </div>
      </div>
      <TemplateList template={template} setTemplate={v => (resume.template = v)} />
    </>
  );
};
