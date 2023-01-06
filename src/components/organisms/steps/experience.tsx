import React from "react";
import { Input } from "../../atoms/fields/input";
import { StateSetter, useNestArrayState, useNestObjectState } from "../../../utils/mutators";
import { SortableList } from "../../layout/sortableList";
import { RichTextEditor } from "../../atoms/fields/richText";
import { StepWrapper } from "../../molecules/stepWrapper";
import { Entry, ExperienceSection } from "../../../models/sections/experienceSection";

const Entry: React.FC<{ state: Entry; setState: StateSetter<Entry> }> = ({ state, setState }) => {
  const makeSetter = useNestObjectState(setState);
  return (
    <>
      <Input
        className="md:col-span-1"
        label="From"
        onChange={makeSetter("from")}
        value={state["from"]}
      />
      <Input className="md:col-span-1" label="To" onChange={makeSetter("to")} value={state["to"]} />
      <Input
        className="col-span-full"
        label="Title"
        onChange={makeSetter("title")}
        value={state["title"]}
      />
      <Input
        className="col-span-full"
        label="Company"
        onChange={makeSetter("subtitle")}
        value={state["company"]}
      />
      <Input
        className="col-span-full"
        label="Url"
        onChange={makeSetter("url")}
        value={state["url"]}
      />
      <RichTextEditor
        className="col-span-full"
        label="Description"
        onChange={makeSetter("description")}
        value={state["description"]}
      />
    </>
  );
};

export const Experience: React.FC<{
  goToNext?: () => void;
  goToPrev?: () => void;
  imageDataUrl?: string;
  state: ExperienceSection;
  setState: StateSetter<ExperienceSection>;
}> = ({ state, setState, ...props }) => {
  const entriesSetter = useNestObjectState(setState)("content");
  const makeEntrySetter = useNestArrayState(entriesSetter);
  return (
    <StepWrapper {...props}>
      <SortableList
        label="Entries"
        state={state.content}
        setState={entriesSetter}
        renderPreview={e => (
          <>
            {`${e.from} - ${e.to}`}
            {e.title && `: ${e.title}`}
          </>
        )}
        render={(e, i) => <Entry key={i} state={e} setState={makeEntrySetter(i)} />}
        className="col-span-full"
        onAddNew={() =>
          entriesSetter(entries => [
            ...entries,
            // withKey({ from: "", to: "", title: "", description: "", city: "", company: "" }),
          ])
        }
      />
    </StepWrapper>
  );
};
