import { Image, Link, Page, StyleSheet, Text, View, Font } from "@react-pdf/renderer";
import { TwoColumns } from "../layouts/twoColumns";
import React, { ReactElement } from "react";
import { ResumeTemplate } from "../types";
import {
  ResumeModel, Section,
} from "../../models/v1";
import { Style } from "@react-pdf/types";
import { T } from "../components/text";
import { Date, DateStyle } from "../components/date";
import { ExperienceList, ExperienceSection } from "../../models/sections/experienceSection";
import { RepeatedEntriesSection, TitledSection } from "../components/sections";
import { KeyValueList } from "../../models/sections/keyValueSection";

interface PersonalInfoStyle {
  image: Style;
  container: Style;
  fullName: Style;
  jobTitle: Style;
  description: Style;
}

interface ExperienceEntryStyle {
  wrapper: Style;
  titleWrapper: Style;
  title: Style;
  // IMPORTANT! This can be a link and should therefore include color
  subtitle: Style;
  description: Style;
}


interface KeyValueEntryStyle {
  wrapper: Style;
  name: Style;
  value: Style;
}

interface SectionStyle {
  title: Style;
  section: Style;
}

export interface AlexandraBaseStyle {
  page: Style;
  experienceEntry: ExperienceEntryStyle;
  keyValueEntry: KeyValueEntryStyle;
  simpleListEntry: Style;
  textSection: {
    content: Style;
  }
  date: DateStyle;
  mainSection: SectionStyle;
  sidebarSection: SectionStyle;
  leftPane: Style;
  rightPane: Style;
  personalInfo: PersonalInfoStyle;
  legalClause: Style;
}

export interface AlexandraBaseProps {
  data: ResumeModel;
  columnsGap: string;
  style: AlexandraBaseStyle;
}

export const AleksandraBase: React.FC<AlexandraBaseProps> = ({ data, style, columnsGap }) => {
  const image = data.appearance.image;
  const Introduction: ResumeTemplate = ({ data }) => (
    <View style={style.personalInfo.container}>
      {image && <Image style={style.personalInfo.image} src={image} />}
      <T style={style.personalInfo.fullName}>
        {data.personalInformation.name} {data.personalInformation.surname}
      </T>
      <T style={style.personalInfo.jobTitle}>{data.personalInformation.jobTitle}</T>
      <T style={style.personalInfo.description}>{data.personalInformation.shortDescription}</T>
    </View>
  );


  const Experience: React.FC<{ data: ExperienceList[0] }> = ({ data }) => (
    <View style={style.experienceEntry.wrapper}>
      <View style={style.experienceEntry.titleWrapper}>
        <T style={style.experienceEntry.title}>{data.title}</T>
        <Date from={data.from} to={data.to} style={style.date} />
      </View>
      <T style={style.experienceEntry.subtitle} url={data.url}>{data.subtitle}</T>
      <T style={style.experienceEntry.description}>{data.description}</T>
    </View>
  );

  const KeyValueEntry: React.FC<{ data: KeyValueList[0] }> = ({ data }) => {
    return <View style={{ 
      display: "flex", 
      flexDirection: "row", 
      flexWrap: "wrap", 
      justifyContent: "space-between", 
      ...style.keyValueEntry.wrapper
      }}>
      <Text style={style.keyValueEntry.name}>{data.name}</Text><Text style={style.keyValueEntry.value}>{data.value}</Text>
    </View>
  }

  const MainSection: React.FC<{ data: Section }> = ({ data }) => {
    const title = <T wrap={true} style={style.mainSection.title}>
      {data.title}
    </T>
    if (data.section.type === "experience") {
      return <RepeatedEntriesSection
        style={style.sidebarSection.section}
        title={title}
        component={Experience}
        data={data.section.content}
      />
    }
    if (data.section.type === "text") {
      return <TitledSection style={style.sidebarSection.section} title={title}>
        <Text style={style.textSection.content}>{data.section.content}</Text>
      </TitledSection>
    }
    return null;
  }

  const SidebarSection: React.FC<{ data: Section }> = ({ data }) => {
    const title = <T wrap={true} style={style.sidebarSection.title}>
      {data.title}
    </T>;
    if (data.section.type === "key value") {
      return <RepeatedEntriesSection
        style={style.sidebarSection.section}
        title={title}
        component={KeyValueEntry}
        data={data.section.content}
      />
    }
    if (data.section.type === "simple list") {
      return <TitledSection title={title} style={style.sidebarSection.section}>
        <View>
          {data.section.content.map(({ content }) => <Text style={style.simpleListEntry}>{content}</Text>)}
        </View>
      </TitledSection>
    }
    return null;
  }

  return (
    <Page style={style.page} size={data.appearance.paperSize}>
      <TwoColumns
        gap={columnsGap}
        left={<View>
          <Introduction data={data} />
          {data.sections.map(s => (<SidebarSection data={s} />))}
        </View>}
        right={
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100%",
            }}>
            {data.sections.map(s => (<MainSection data={s} />))}
            <T style={[style.legalClause, { marginTop: "auto" }]}>{data.legalClause}</T>
          </View>
        }
        leftStyle={style.leftPane}
        rightStyle={style.rightPane}
      />
    </Page>
  );
};
