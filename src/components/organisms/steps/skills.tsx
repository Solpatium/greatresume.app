import React, { useCallback, useState } from "react";
import { Card } from "../../atoms/card";
import { Input } from "../../atoms/fields/input";
import { Button, Radio } from "antd";
import { ResumeModel, Skill } from "../../../models/v1";
import { StateSetter, useNestArrayState, useNestObjectState } from "../../../utils/mutators";

import { SortableList } from "../../layout/sortableList";
import { Label } from "../../atoms/fields/label";
import { FormStep } from "./types";
import { StepWrapper } from "../../molecules/stepWrapper";
import { withKey } from "../../../utils/lists";

const SkillValue: React.FC<{
  value?: string | number;
  onChange: (value?: string | number) => void;
}> = ({ value, onChange }) => {
  const [customLevel, setCustomLevel] = useState(typeof value === "string" ? value : "");
  const onTypeChange = useCallback(
    e => {
      const selectedOption = e.target.value;
      let newValue = selectedOption === "custom" ? customLevel : parseInt(selectedOption, 10);
      if (newValue === value) {
        newValue = undefined;
      }
      onChange(newValue);
    },
    [customLevel, onChange, value],
  );
  const groupValue = typeof value === "number" ? "" + value : "custom";
  const radioProps = {
    onChange: onTypeChange,
    value: value === undefined ? "no-level" : groupValue,
    buttonStyle: "solid",
  } as const;
  return (
    <div>
      <Label name="Level">
        <Radio.Group {...radioProps}>
          <Radio.Button value="no-level">Hide</Radio.Button>
        </Radio.Group>
        <Radio.Group {...radioProps}>
          <Radio.Button value="1">Beginner</Radio.Button>
          <Radio.Button value="2">Intermediate</Radio.Button>
          <Radio.Button value="3">Advanced</Radio.Button>
          <Radio.Button value="4">Proficient</Radio.Button>
        </Radio.Group>
        <Radio.Group {...radioProps}>
          <Radio.Button value="custom">Custom</Radio.Button>
          <Input
            placeholder="Custom"
            onChange={setCustomLevel}
            disabled={value !== "custom"}
            value={customLevel}
          />
        </Radio.Group>
      </Label>
    </div>
  );
};

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
          entriesSetter(entries => [...entries, withKey({ name: "Skill", level: "5" })])
        }
      />
    </StepWrapper>
  );
};
