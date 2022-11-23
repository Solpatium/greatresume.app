import React from "react";
import { Input } from "../../atoms/fields/input";
import { WorkEntry } from "../../../models/v1";
import { StateSetter, useNestArrayState, useNestObjectState } from "../../../utils/mutators";
import { SortableList } from "../../layout/sortableList";
import { RichTextEditor } from "../../atoms/fields/richText";
import { FormStep } from "./types";
import { StepWrapper } from "../../molecules/stepWrapper";
import { withKey } from "../../../utils/lists";

const Entry: React.FC<{ state: WorkEntry; setState: StateSetter<WorkEntry> }> = ({
  state,
  setState,
}) => {
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
        onChange={makeSetter("company")}
        value={state["company"]}
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

export const WorkExperience: FormStep = ({ state, setState, ...props }) => {
  const makeSetter = useNestObjectState(useNestObjectState(setState)("experience"));
  const entriesSetter = makeSetter("content");
  const makeEntrySetter = useNestArrayState(entriesSetter);
  const formState = state.experience;
  return (
    <StepWrapper {...props}>
      <Input
        label="Title"
        value={formState.title ?? "Work Experience"}
        onChange={makeSetter("title")}
        className="md:col-span-2"
      />
      <SortableList
        label="Entries"
        state={formState.content}
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
            withKey({ from: "", to: "", title: "", description: "", city: "", company: "" }),
          ])
        }
      />
    </StepWrapper>
  );
};
