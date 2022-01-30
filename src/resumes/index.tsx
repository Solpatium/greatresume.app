import React, { useMemo } from "react";
import { EducationEntry, ResumeModel, WorkEntry } from "../models/v1";
import { HTMLText } from "../components/atoms/htmlText";
import { Renderer } from "./layouts/layout";
import { Image, Document, Page, StyleSheet, Text, usePDF, View } from "@react-pdf/renderer";
import { useDebounce } from "react-use";
import { downloadFile } from "../utils/downloadFile";
import { TwoColumns } from "./layouts/twoColumns";
import { Aleksandra } from "./templates/aleksandra";
import { registerResumeFonts } from "./fonts";

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
    Layout: TwoColumns,
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

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    border: "solid",
    borderColor: "red",
    borderWidth: "10px",
  },
  header: {
    width: "100%",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  red: {
    color: "red",
    fontSize: "50px",
  },
  blue: {
    color: "blue",
    fontSize: "50px",
  },
  yellow: {
    color: "yellow",
    fontSize: "50px",
  },
  brown: {
    color: "brown",
    fontSize: "50px",
  },
  image: {
    width: "100px",
    height: "100px",
  },
});

registerResumeFonts();

export const useRenderResume = (data: ResumeModel): { url?: string; download: () => void } => {
  const [{ url }, refreshPdf] = usePDF({
    document: (
      <Document>
        <Aleksandra data={data} />
      </Document>
    ),
  });

  useDebounce(
    () => {
      refreshPdf();
    },
    1000,
    [data],
  );

  return useMemo(
    () => ({
      url,
      download: () => {
        downloadFile(url, "resume.pdf");
      },
    }),
    [url],
  );
};
