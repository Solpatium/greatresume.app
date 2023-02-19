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
import { ContactInside, ExperienceEntry, ExperienceEntryStyle, Introduction, KeyValueEntryStyle, KeyValueSection, PersonalInfoStyle, SimpleListSection } from "./parts";


interface SectionStyle {
  title: Style;
  section: Style & { gap: number };
}

export interface SingleColumnStyle {
  page: Style;
  markdown: MarkdownStyle,
  experienceEntry: ExperienceEntryStyle;
  keyValueEntry: KeyValueEntryStyle;
  contactEntry: KeyValueEntryStyle;
  simpleListEntry: Style;
  textSection: {
    content: Style;
  }
  section: SectionStyle;
  sidebarSection: SectionStyle;
  personalInfo: PersonalInfoStyle;
  legalClause: Style;
}

export interface SingleColumnTemplateProps {
  data: ResumeModel;
  style: SingleColumnStyle;
  translate: (key: string) => string;
}


export const SingleColumnTemplate: React.FC<SingleColumnTemplateProps> = ({ data, style, translate }) => {
  const image = data.appearance.image;

  const SectionWrapper: React.FC<{ title: string, children: ReactElement | ReactElement[] }> = ({ title, children }) => (<TitledSection
    title={<T wrap style={style.section.title}>{title}</T>}
    style={style.section.section}>
    {children}
  </TitledSection>);

  const MainSection: React.FC<{ data: Section }> = ({ data }) => {
    if (data.section.type === "experience") {
      return <SectionWrapper title={data.title}>
        {spreadEntries(
          data.section.content,
          props => <ExperienceEntry {...props} style={style.experienceEntry} markdownStyle={style.markdown} />,
          { gap: 0 })
        }
      </SectionWrapper>
    }
    if (data.section.type === "text") {
      return <SectionWrapper title={data.title}>
        <View style={style.textSection.content}>
          <Markdown style={style.markdown}>{data.section.content}</Markdown>
        </View>
      </SectionWrapper>
    }
    if (data.section.type === "key value") {
      return <SectionWrapper title={data.title}>
        <KeyValueSection data={data.section.content} style={style.keyValueEntry} />
      </SectionWrapper>
    }
    if (data.section.type === "simple list") {
      return <SectionWrapper title={data.title}>
        <SimpleListSection data={data.section.content} style={style.simpleListEntry} />
      </SectionWrapper>
    }
    return null;
  }

  const contact = (<SectionWrapper title={translate("contact")}>
    <ContactInside
      data={data.personalInformation} style={style.contactEntry}
      phoneLabel={translate("phone")} emailLabel={translate("email")}
    />
  </SectionWrapper>)

  return (
    <Page style={style.page} size={data.appearance.paperSize}>
      <Introduction data={data} style={style.personalInfo} image={image} />
      {contact}
      {data.sections.map(s => (<MainSection data={s} />))}
      <T style={[style.legalClause, { marginTop: "auto" }]}>{data.legalClause}</T>
    </Page>
  );
};
