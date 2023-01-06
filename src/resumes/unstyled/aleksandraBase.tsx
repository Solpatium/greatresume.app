import { Image, Link, Page, StyleSheet, Text, View, Font } from "@react-pdf/renderer";
import { TwoColumns } from "../layouts/twoColumns";
import React, { ReactElement } from "react";
import { ResumeTemplate } from "../types";
import {
  DatedEntry,
  EducationEntry,
  PersonalInformation,
  ResumeModel,
  WorkEntry,
} from "../../models/v1";
import { Style } from "@react-pdf/types";
import { T } from "../components/text";
import { Entry, RepeatedEntriesSection } from "../components/sections";
import { Date, DateStyle } from "../components/date";

interface PersonalInfoStyle {
  image: Style;
  container: Style;
  fullName: Style;
  jobTitle: Style;
  description: Style;
}

interface EntryStyle {
  wrapper: Style;
  titleWrapper: Style;
  title: Style;
  subtitle: Style;
  description: Style;
}

interface MainSectionStyle {
  title: Style;
  section: Style;
}

export interface AlexandraBaseStyle {
  page: Style;
  entry: EntryStyle;
  date: DateStyle;
  mainSection: MainSectionStyle;
  leftPane: Style;
  rightPane: Style;
  personalInfo: PersonalInfoStyle;
  legalClause: Style;
}

export interface AlexandraBaseProps {
  data: ResumeModel;
  leftWidth: string;
  style: AlexandraBaseStyle;
}

export const AleksandraBase: React.FC<AlexandraBaseProps> = ({ data, leftWidth, style }) => {
  const Introduction: ResumeTemplate = ({ data }) => (
    <View style={style.personalInfo.container}>
      {data.image && <Image style={style.personalInfo.image} src={data.image} />}
      <T style={style.personalInfo.fullName}>
        {data.personalInformation.name} {data.personalInformation.surname}
      </T>
      <T style={style.personalInfo.jobTitle}>{data.personalInformation.jobTitle}</T>
      <T style={style.personalInfo.description}>{data.personalInformation.shortDescription}</T>
    </View>
  );

  // const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  //   <T wrap={true} style={style.mainSection.title}>
  //     {title}
  //   </T>
  // );
  //
  // const EntryTitle: React.FC<{ entry: DatedEntry; title: string }> = ({ entry, title }) => (
  //   <View style={style.entry.titleWrapper}>
  //     <Text style={style.entry.title}>{title}</Text>
  //     <Date from={entry.from} to={entry.to} style={style.date} />
  //   </View>
  // );

  // const Experience: Entry<WorkEntry> = ({ data }) => (
  //   <View style={style.entry.wrapper}>
  //     <EntryTitle entry={data} title={data.title} />
  //     <T style={style.entry.subtitle}>{data.company}</T>
  //     <T style={style.entry.description}>{data.description}</T>
  //   </View>
  // );
  //
  // const Education: Entry<EducationEntry> = ({ data }) => (
  //   <View style={style.entry.wrapper}>
  //     <EntryTitle entry={data} title={data.degree} />
  //     <T style={style.entry.description}>{data.description}</T>
  //   </View>
  // );

  return (
    <Page style={style.page} size={data.paperSize}>
      <TwoColumns
        left={<Introduction data={data} />}
        right={
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}>
            {/*<RepeatedEntriesSection*/}
            {/*  title={<SectionTitle title={data.experience.title} />}*/}
            {/*  component={Experience}*/}
            {/*  data={data.experience.content}*/}
            {/*/>*/}
            {/*<RepeatedEntriesSection*/}
            {/*  title={<SectionTitle title={data.education.title} />}*/}
            {/*  component={Education}*/}
            {/*  data={data.education.content}*/}
            {/*/>*/}
            {/*<RepeatedEntriesSection*/}
            {/*  title={<SectionTitle title={data.experience.title} />}*/}
            {/*  component={Experience}*/}
            {/*  data={data.experience.content}*/}
            {/*/>*/}
            <T style={[style.legalClause, { marginTop: "auto" }]}>{data.legalClause}</T>
          </View>
        }
        leftWidth={leftWidth}
        leftStyle={style.leftPane}
        rightStyle={style.rightPane}
      />
    </Page>
  );
};
