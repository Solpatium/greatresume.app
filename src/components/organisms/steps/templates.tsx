import React, { useMemo, useState } from "react";
import { FormStep } from "./types";
import { StepWrapper } from "../../molecules/stepWrapper";
import { templates } from "../../../templates";
import Image from "next/image";
import classes from "classnames";
import { Label } from "../../atoms/fields/label";
import { useNestObjectState } from "../../../utils/mutators";

const tmpTemplate = { ...templates.aleksandra, name: "other name" };
const tmpTemplates = {
  aleksandra: templates.aleksandra,
  red: tmpTemplate,
  blue: tmpTemplate,
  green: tmpTemplate,
  jacob: tmpTemplate,
  bird: { ...tmpTemplate, tags: ["birb", "pretty"] },
};
type TemplateName = keyof typeof tmpTemplates;
const allTags = [...new Set(Object.values(tmpTemplates).flatMap(t => t.tags))];

const TemplateList: React.FC<{
  template: string;
  setTemplate: (template: string) => void;
}> = ({ template, setTemplate }) => {
  const [activeTags, setActiveTags] = useState<Record<string, boolean>>(() => {
    const tags: Record<string, boolean> = {};
    for (const tag of allTags) {
      tags[tag] = false;
    }
    return tags;
  });
  const filtersEnabled = Object.values(activeTags).some(v => v);
  const filteredTemplates = useMemo(() => {
    if (!filtersEnabled) {
      return [...Object.values(tmpTemplates)];
    }
    const activeTagList = Object.entries(activeTags)
      .filter(([, enabled]) => enabled)
      .map(([tag]) => tag);
    console.log("ACTIVE TAGS LIST", activeTagList);
    return Object.values(tmpTemplates).filter(t =>
      activeTagList.every(tag => t.tags.includes(tag)),
    );
  }, [activeTags, filtersEnabled]);

  const availableTags = useMemo(() => new Set(filteredTemplates.flatMap(t => t.tags)), [
    filteredTemplates,
  ]);
  console.log(filteredTemplates, availableTags, activeTags);

  return (
    <div className="col-span-full">
      <div className="mb-4">
        <Label name="Filters" />
        {allTags.map((tag, index) => (
          <button
            type="button"
            disabled={filtersEnabled && !availableTags.has(tag)}
            className={classes(
              "font-medium inline-block capitalize px-2 py-1 rounded-md mr-2",
              availableTags.has(tag) && !activeTags[tag] && "bg-gray-100 text-gray-600",
              activeTags[tag] && "bg-blue-400 text-white",
              !availableTags.has(tag) && "bg-gray-50 text-gray-200 pointer-events-none",
            )}
            onClick={() => setActiveTags(active => ({ ...active, [tag]: !active[tag] }))}
            key={index}>
            {tag}
          </button>
        ))}
      </div>
      <Label name="Templates" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredTemplates.map(t => {
          return (
            <div
              key={t.title}
              className="cursor-pointer relative rounded-xl"
              onClick={() => setTemplate(t.name)}>
              <Image
                className="bg-gray-100 rounded-xl border-solid border-2 border-b-0 border-gray-100 hover:border-blue-200"
                src="/dad"
                layout="responsive"
                width="100%"
                height="100%"
              />
              <div
                className={classes(
                  "text-base font-regular text-white capitalize absolute bottom-0 px-3 py-2 rounded-b-xl w-full",
                  t.name === template ? "bg-blue-500" : "bg-blue-400",
                )}>
                {t.name === template && <div className="text-xs">Selected</div>}
                {t.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Templates: FormStep = ({ state, setState, ...props }) => {
  const template = state.template || "aleksandra";
  const setTemplate = useNestObjectState(setState)("template");
  console.log("TEMPLATE = ", template);
  return (
    <StepWrapper {...props}>
      <TemplateList template={template} setTemplate={setTemplate} />
    </StepWrapper>
  );
  return null;
};
