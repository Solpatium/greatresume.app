import React from "react";
import { Input } from "../../atoms/fields/input";
import { Interest } from "../../../models/v1";
import { StateSetter, useNestArrayState, useNestObjectState } from "../../../utils/mutators";

import { SortableList } from "../../layout/sortableList";
import { FormStep } from "./types";
import { StepWrapper } from "../../molecules/stepWrapper";
import { withKey } from "../../../utils/lists";

const Entry: React.FC<{ state: Interest; setState: StateSetter<Interest> }> = ({
  state,
  setState,
}) => {
  const makeSetter = useNestObjectState(setState);
  return (
    <Input
      className="col-span-1"
      label="Name"
      onChange={makeSetter("name")}
      value={state["name"]}
    />
  );
};

export const InterestsForm: FormStep = ({ state, setState, ...props }) => {
  const makeSetter = useNestObjectState(useNestObjectState(setState)("interests"));
  const entriesSetter = makeSetter("content");
  const makeEntrySetter = useNestArrayState(entriesSetter);
  const formState = state.interests;
  return (
    <StepWrapper {...props}>
      <Input
        label="Title"
        className="md:col-span-2"
        value={formState.title ?? "Skills"}
        onChange={makeSetter("title")}
      />
      <SortableList
        label="Entries"
        className="col-span-full"
        state={formState.content}
        setState={entriesSetter}
        render={(e, i) => <Entry key={i} state={e} setState={makeEntrySetter(i)} />}
        renderPreview={content => content.name}
        onAddNew={() => entriesSetter(entries => [...entries, withKey({ name: "" })])}
      />
    </StepWrapper>
  );
};
