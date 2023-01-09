import React, { useCallback, useState } from "react";
import { Card } from "../../atoms/card";
import { Input } from "../../atoms/fields/input";
import { ResumeModel, Skill } from "../../../models/v1";
import { StateSetter, useNestArrayState, useNestObjectState } from "../../../utils/mutators";

import { SortableList } from "../../layout/sortableList";
import { FormStep } from "./types";
import { StepWrapper } from "../../molecules/stepWrapper";
import { withId } from "../../../utils/lists";

const Entry: React.FC<{ state: Skill; setState: StateSetter<Skill> }> = ({ state, setState }) => {
  const makeSetter = useNestObjectState(setState);
  return (
    <>
      <Input
        className="col-span-1"
        label="Name"
        onChange={makeSetter("name")}
        value={state["name"]}
      />
      <Input
        label="Level"
        info="Use 1/2/3/4/5 for visual progress"
        className="col-span-1"
        value={state["level"]}
        onChange={makeSetter("level")}
      />
    </>
  );
};

export const SkillsForm: FormStep = ({ state, setState, ...props }) => {
  const makeSetter = useNestObjectState(useNestObjectState(setState)("skills"));
  const entriesSetter = makeSetter("content");
  const makeEntrySetter = useNestArrayState(entriesSetter);
  const formState = state.skills;
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
        renderPreview={content => (
          <>
            {content.name} {content.level && `(${content.level})`}
          </>
        )}
        onAddNew={() =>
          entriesSetter(entries => [...entries, withId({ name: "Skill", level: "5" })])
        }
      />
    </StepWrapper>
  );
};
