import React from "react";
import { EducationEntry, ResumeModel, WorkEntry } from "../models/v1";
import { TwoColumnsLayout } from "./layouts/twoColumns";
import { HTMLText } from "../components/atoms/htmlText";
import { Renderer } from "./layouts/layout";

const join = (sep = ",", ...args: string[]): string => {
  return args.filter(v => v).join(sep);
};

const DatedEntry: React.FC<
  Record<"key" | "from" | "to" | "title" | "subtitle" | "description", string>
> = ({ key, from, to, title, subtitle, description }) => (
  <section key={key} className="dated-entry">
    <div className="daterange">{`${from} — ${to}`}</div>
    <div className="title">{title}</div>
    <div className="subtitle">{subtitle}</div>
    <div className="short-description">
      <HTMLText>{description}</HTMLText>
    </div>
  </section>
);

export const templates: Record<
  string,
  {
    Layout: React.FC;
    render: {
      education: Renderer<EducationEntry>;
      experience: Renderer<WorkEntry>;
    };
    tags: string[];
    name: string;
    title: string;
  }
> = {
  aleksandra: {
    Layout: TwoColumnsLayout,
    render: {
      education: (e, i) => (
        <DatedEntry {...e} key={"" + i} title={e.degree} subtitle={join(", ", e.school, e.city)} />
      ),
      experience: (e, i) => (
        <DatedEntry {...e} key={"" + i} subtitle={join(", ", e.company, e.city)} />
      ),
      // {
      //   const universityLine = join(", ", e.school, e.city);
      //   return (
      //     <section key={i} className="section-education">
      //       <div className="daterange">{`${e.from} — ${e.to}`}</div>
      //       <div className="degree">{e.degree}</div>
      //       <div className="school-line">{universityLine}</div>
      //       <div className="short-description">
      //         <HTMLText>{e.description}</HTMLText>
      //       </div>
      //     </section>
      //   );
      // },
    },
    tags: ["Two columns", "pretty"],
    name: "aleksandra",
    title: "Aleksandra",
  },
};

const Preview: React.FC<{
  data: ResumeModel;
}> = React.forwardRef(({ data }, ref) => {
  const templateName = data.template in templates ? data.template : "aleksandra";
  const template = templates[templateName];
  return (
    <template.Layout
      data={data}
      className={`page-${data.paperSize} template-${templateName}`}
      ref={ref}
      render={template.render}
    />
  );
});

export default Preview;
