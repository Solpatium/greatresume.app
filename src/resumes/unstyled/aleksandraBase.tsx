import { Image, Link, Page, StyleSheet, Text, View, Font } from "@react-pdf/renderer";
import React, { ReactElement } from "react";
import { ResumeTemplate } from "../types";
import {
  ResumeModel, Section,
} from "../../models/v1";
import { Style } from "@react-pdf/types";
import { T } from "../components/text";
import { Date, DateStyle } from "../components/date";
import { ExperienceList, ExperienceSection } from "../../models/sections/experienceSection";
import { RepeatedEntriesSection, spreadEntries, TitledSection } from "../components/sections";
import { KeyValueList } from "../../models/sections/keyValueSection";
import { Markdown, MarkdownStyle } from "../components/markdown";
import { PersonalInformation } from "../../models/sections/personalInfo";
import { ContactInside, ExperienceEntry, ExperienceEntryStyle, Introduction, KeyValueEntry, KeyValueEntryStyle, KeyValueSection, PersonalInfoStyle, SimpleListSection } from "./parts";


interface SectionStyle {
  title: Style;
  section: Style & { gap: number };
}

export interface AlexandraBaseStyle {
  page: Style;
  markdown: MarkdownStyle,
  experienceEntry: ExperienceEntryStyle;
  keyValueEntry: KeyValueEntryStyle;
  contactEntry: KeyValueEntryStyle;
  simpleListEntry: Style;
  textSection: {
    content: Style;
  }
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
  translate: (key: string) => string;
}

export const TwoColumns: React.FC<{
  left: ReactElement | ReactElement[];
  right: ReactElement | ReactElement[];
  leftStyle: Style;
  rightStyle: Style;
  gap?: string;
}> = ({ left, right, gap, leftStyle, rightStyle }) => {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <View style={[{ minHeight: "100%" }, leftStyle]}>{left}</View>
      <View style={{ width: gap }} />
      <View style={[{ minHeight: "100%" }, rightStyle]}>{right}</View>
    </View>
  );
};

export const AleksandraBase: React.FC<AlexandraBaseProps> = ({ data, style, columnsGap, translate }) => {
  const image = data.appearance.image;

  const sidebarTitle = (title: string) => (<T wrap style={style.sidebarSection.title}>{title}</T>)

  const SidebarSectionWrapper: React.FC<{ title: string, children: ReactElement }> = ({ title, children }) => (<TitledSection
    title={<T wrap style={style.sidebarSection.title}>{title}</T>}
    style={style.sidebarSection.section}>
    {children}
  </TitledSection>);

  const MainSection: React.FC<{ data: Section }> = ({ data }) => {
    const title = <T wrap={true} style={style.mainSection.title}>
      {data.title}
    </T>
    if (data.section.type === "experience") {
      return <RepeatedEntriesSection
        style={style.mainSection.section}
        title={title}
        component={props => <ExperienceEntry {...props} style={style.experienceEntry} markdownStyle={style.markdown} />}
        data={data.section.content}
      />
    }
    if (data.section.type === "text") {
      return <TitledSection style={style.mainSection.section} title={title}>
        <View style={style.textSection.content}>
          <Markdown style={style.markdown}>{data.section.content}</Markdown>
        </View>
      </TitledSection>
    }
    return null;
  }

  const SidebarSection: React.FC<{ data: Section }> = ({ data }) => {
    if (data.section.type === "key value") {
      return <SidebarSectionWrapper title={data.title}>
        <KeyValueSection data={data.section.content} style={style.keyValueEntry} />
      </SidebarSectionWrapper>
    }
    if (data.section.type === "simple list") {
      return <SidebarSectionWrapper title={data.title}>
        <SimpleListSection data={data.section.content} style={style.simpleListEntry} />
      </SidebarSectionWrapper>
    }
    return null;
  }

  const contact = (<SidebarSectionWrapper title={translate("contact")}>
    <ContactInside
      data={data.personalInformation} style={style.contactEntry}
      phoneLabel={translate("phone")} emailLabel={translate("email")}
    />
  </SidebarSectionWrapper>)

  return (
    <Page style={style.page} size={data.appearance.paperSize}>
      <TwoColumns
        gap={columnsGap}
        left={<View>
          <Introduction data={data} style={style.personalInfo} image={image} />
          {contact}
          {data.sections.map(s => (<SidebarSection data={s} />))}
        </View>}
        right={
          <View
            style={{
              display: "flex",
              flexGrow: 1,
              flexShrink: 0,
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
