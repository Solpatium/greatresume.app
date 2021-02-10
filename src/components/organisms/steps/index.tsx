import styled, { css } from "styled-components";
import { hiddenOnPrint } from "../../atoms/hiddenOnPrint";
import { Stepper } from "../../molecules/stepper";
import React from "react";
import { PersonalInformation } from "./personalInfo";
import { ResumeModel } from "../../../models/v1";
import { StateSetter } from "../../../utils/mutators";
import { Templates } from "./templates";
import { WorkExperience } from "./workExperience";
import { EducationForm } from "./education";
import { useRouter } from "next/router";
import { SkillsForm } from "./skills";

const Wrapper = styled.div`
  ${hiddenOnPrint}
  position: sticky;
  top: 20px;
`;

export const SectionSet: React.FC<{
  state: ResumeModel;
  setState: StateSetter<ResumeModel>;
  className?: string;
}> = props => {
  const { query } = useRouter();
  const initialStep = query.step;
  return (
    <div className={props.className}>
      <Wrapper>
        <Stepper
          {...props}
          steps={[
            {
              title: "Templates",
              element: Templates,
            },
            {
              title: "Personal info",
              element: PersonalInformation,
            },
            {
              title: "Work experience",
              element: WorkExperience,
            },
            {
              title: "Education",
              element: EducationForm,
            },
            {
              title: "Skills",
              element: SkillsForm,
            },
            {
              title: "Education",
              element: () => null,
            },
            {
              title: "Education",
              element: () => null,
            },
          ]}
        />
      </Wrapper>
    </div>
  );
};
