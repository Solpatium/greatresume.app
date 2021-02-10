import React from "react";
import { HTMLText } from "../../components/atoms/htmlText";
import { ResumeModel } from "../../models/v1";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 297mm;
  width: 210mm;
  @import url("https://fonts.googleapis.com/css2?family=Merriweather&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap");
  display: grid;
  overflow: hidden;
  grid-template-areas:
    "header header"
    "main sidebar";
  grid-template-rows: auto 1fr;

  &:not(:first-child) {
    grid-template-areas: "main sidebar";
    grid-template-rows: 1fr;
  }
  margin-bottom: 20px;
  grid-template-columns: 70% 30%;
  border-spacing: 0;
  padding: 40px;
  & p {
    margin: 0;
    padding-bottom: 1em;
  }

  .header {
    grid-area: header;
    text-align: center;
    .name {
      font-size: 24px;
      font-family: "Merriweather", serif;
      .first-name,
      .last-name {
        display: inline-block;
      }
    }
  }
  .sidebar {
    background: red;
    vertical-align: top;
    grid-area: sidebar;
  }
  .section {
    break-inside: avoid;
  }
  .main {
    grid-area: main;
    background: yellow;
  }
`;

const DivContent: React.FC<{ className?: string; html?: boolean }> = props => (
  <div className={props.children ? props.className : `${props.className} empty`}>
    {props.html && typeof props.children === "string" ? (
      <HTMLText>{props.children}</HTMLText>
    ) : (
      props.children
    )}
  </div>
);

export const TwoColumnsWithHeaderLayout: React.FC<{
  data: ResumeModel;
  className?: string;
}> = React.forwardRef(({ data, className }, ref) => {
  const education = [
    ...data.education.content,
    ...data.education.content,
    ...data.education.content,
    ...data.education.content,
    ...data.education.content,
  ];
  return (
    <div id="cv" className={`layout-two-columns ${className}`}>
      <div className="header">
        <div className="name">
          <DivContent className="first-name">{data.personalInformation.name}</DivContent>{" "}
          <DivContent className="last-name">{data.personalInformation.surname}</DivContent>
        </div>
        <DivContent className="job-title">{data.personalInformation.jobTitle}</DivContent>
        <DivContent html className="short-description">
          {data.personalInformation.shortDescription}
        </DivContent>
        <a href="https://www.onet.pl">LINK</a>
      </div>
      <div className="sidebar continue-empty">
        <div>wolol</div>
      </div>
      <div className="main continue-empty">
        {/*<div className="section-set">*/}
        <h1>{data.education.title}</h1>
        {[...education, ...education, ...education].map((e, i) => (
          <section key={i} className="section">
            <div>
              {i} {e.from} - {e.to}
            </div>
            <div>{e.school}</div>
            <div>{e.city}</div>
            <DivContent html className="short-description">
              {e.description}
            </DivContent>
          </section>
        ))}
      </div>
      {/*</div>*/}
    </div>
  );
});
