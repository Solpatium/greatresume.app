import React from "react";
import { Input } from "../../atoms/fields/input";
import { EducationEntry } from "../../../models/v1";
import { StateSetter, useNestArrayState, useNestObjectState } from "../../../utils/mutators";
import { SortableList } from "../../layout/sortableList";
import { RichTextEditor } from "../../atoms/fields/richText";
import { FormStep } from "./types";
import { StepWrapper } from "../../molecules/stepWrapper";
import { withId } from "../../../utils/lists";

const Entry: React.FC<{ state: EducationEntry; setState: StateSetter<EducationEntry> }> = ({
  state,
  setState,
}) => {
  const makeSetter = useNestObjectState(setState);
  return (
    <>
      <Input
        label="From"
        className="col-span-1"
        onChange={makeSetter("from")}
        value={state["from"]}
      />
      <Input label="To" className="col-span-1" onChange={makeSetter("to")} value={state["to"]} />
      <Input
        label="School"
        className="col-span-1"
        onChange={makeSetter("school")}
        value={state["school"]}
      />
      <Input
        label="City"
        className="col-span-1"
        onChange={makeSetter("city")}
        value={state["city"]}
      />
      <Input
        label="Degree"
        className="col-span-full"
        onChange={makeSetter("degree")}
        value={state["degree"]}
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

export const EducationForm: FormStep = ({ state, setState, ...props }) => {
  const makeSetter = useNestObjectState(useNestObjectState(setState)("education"));
  const entriesSetter = makeSetter("content");
  const makeEntrySetter = useNestArrayState(entriesSetter);
  const formState = state.education;
  return (
    <StepWrapper {...props}>
      <Input
        label="Title"
        className="md:col-span-2"
        value={formState.title ?? "Education"}
        onChange={makeSetter("title")}
      />
      <SortableList
        label="Entries"
        className="col-span-full"
        state={formState.content}
        setState={entriesSetter}
        render={(e, i) => <Entry key={i} state={e} setState={makeEntrySetter(i)} />}
        renderPreview={content => <div>{content.degree}</div>}
        onAddNew={() =>
          entriesSetter(entries => [
            ...entries,
            withId({ from: "", to: "", school: "", degree: "", description: "", city: "" }),
          ])
        }
      />
    </StepWrapper>
  );
};
