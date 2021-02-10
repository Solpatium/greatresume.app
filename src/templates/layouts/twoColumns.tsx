import React from "react";
import { HTMLText } from "../../components/atoms/htmlText";
import { ResumeLayout } from "./layout";
import { SkillEntry, SkillList } from "./parts/skills";

const DivContent: React.FC<{ className?: string; html?: boolean }> = props => (
  <div className={props.children ? props.className : `${props.className} empty`}>
    {props.html && typeof props.children === "string" ? (
      <HTMLText>{props.children}</HTMLText>
    ) : (
      props.children
    )}
  </div>
);

export const TwoColumnsLayout: ResumeLayout = React.forwardRef(
  ({ data, className, render }, ref) => {
    const education = [
      ...data.education.content,
      // ...data.education.content,
      // ...data.education.content,
      // ...data.education.content,
      // ...data.education.content,
    ];
    const interests = [
      "Community Involvement",
      "Macroeconomics",
      "Photography",
      "Blogging",
      "Traveling",
    ];
    return (
      <div ref={ref} id="cv" className={`layout-two-columns ${className}`}>
        <div className="sidebar continue-empty">
          <div className="header">
            {data.image && <img className="face" src={data.image} />}
            <div className="name">
              <DivContent className="first-name">{data.personalInformation.name}</DivContent>{" "}
              <DivContent className="last-name">{data.personalInformation.surname}</DivContent>
            </div>
            <DivContent className="job-title">{data.personalInformation.jobTitle}</DivContent>
            {/*<a href="https://www.onet.pl">LINK</a>*/}
          </div>
          <h1 className="section-title">PERSONAL</h1>
          <h1 className="section-title">SKILLS</h1>
          <SkillList data={data.skills.content} />
          <h1 className="section-title">INTERESTS</h1>
          <ul>
            {interests.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="main continue-empty">
          {data.personalInformation.shortDescription && (
            <div className="bio-section">
              <h1 className="section-title">BIO</h1>
              <DivContent html className="short-description">
                {data.personalInformation.shortDescription}
              </DivContent>
            </div>
          )}
          <h1 className="section-title">{data.education.title}</h1>
          {[...education].map(render.education)}
          <h1 className="section-title">{data.workExperience.title}</h1>
          {data.workExperience.content.map(render.workExperience)}
        </div>
        {/*</div>*/}
      </div>
    );
  },
);
