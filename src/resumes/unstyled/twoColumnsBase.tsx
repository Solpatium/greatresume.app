import { Image, Link, Page, StyleSheet, Text, View, Font } from "@react-pdf/renderer";
import React, { ReactElement } from "react";
import { ResumeTemplate } from "../types";
import {
  ResumeModel, Section,
} from "../../models/v1";
import { Style } from "@react-pdf/types";
import { T } from "../components/text";
import { RepeatedEntriesSection, spreadEntries, TitledSection } from "../components/sections";
import { Markdown, MarkdownStyle } from "../components/markdown";
import { ContactInside, ExperienceSection, Introduction, KeyValueEntryStyle, KeyValueSection, MainSectionWrapper, PersonalInfoStyle, SimpleListSection } from "./parts";
import { V } from "../components/view";
import { StyledPage } from "../components/page";


export interface TwoColumnsBaseStyle {
  markdown?: MarkdownStyle,
}

export interface TwoColumnsBaseProps {
  data: ResumeModel;
  background?: React.ReactElement;
  columnsGap: string;
  style?: TwoColumnsBaseStyle;
  translate: (key: string) => string;
}

export const TwoColumns: React.FC<{
  left: ReactElement | ReactElement[];
  right: ReactElement | ReactElement[];
  gap?: string;
}> = ({ left, right, gap }) => {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <V className="leftPane" style={{ minHeight: "100%" }}>{left}</V>
      <View style={{ width: gap }} />
      <V className="rightPane" style={{ minHeight: "100%" }}>{right}</V>
    </View>
  );
};

export const TwoColumnsBase: React.FC<TwoColumnsBaseProps> = ({ 
  data, style, columnsGap, translate, background,
}) => {
  const image = data.appearance.image;

  const SidebarSectionWrapper: React.FC<{ title: string, children: ReactElement }> = ({ title, children }) => (<TitledSection
    className="sidebarSection"
    title={<T wrap className="sidebarSectionTitle">{title}</T>}
  >
    {children}
  </TitledSection>);

  const MainSection: React.FC<{ data: Section }> = ({ data }) => {
    if (data.section.type === "experience") {
      return <ExperienceSection title={data.title} data={data.section.content} markdownStyle={style?.markdown} />;
    }
    if (data.section.type === "text") {
      return <MainSectionWrapper title={data.title} className="textSection">
        <View>
          <Markdown style={style?.markdown}>{data.section.content}</Markdown>
        </View>
      </MainSectionWrapper>
    }
    return null;
  }

  const SidebarSection: React.FC<{ data: Section }> = ({ data }) => {
    if (data.section.type === "key value") {
      return <SidebarSectionWrapper title={data.title}>
        <KeyValueSection data={data.section.content} />
      </SidebarSectionWrapper>
    }
    if (data.section.type === "simple list") {
      return <SidebarSectionWrapper title={data.title}>
        <SimpleListSection data={data.section.content} />
      </SidebarSectionWrapper>
    }
    return null;
  }

  const contact = (<SidebarSectionWrapper title={translate("contact")}>
    <ContactInside
      data={data.personalInformation}
      phoneLabel={translate("phone")} emailLabel={translate("email")}
    />
  </SidebarSectionWrapper>)

  return (
    <StyledPage background={background} size={data.appearance.paperSize}>
      <TwoColumns
        gap={columnsGap}
        left={<View>
          <Introduction data={data} image={image} />
          {contact}
          {data.sections.map((s,i) => (<SidebarSection key={i} data={s} />))}
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
            {data.sections.map((s,i) => (<MainSection key={i} data={s} />))}
            <T className="legalClause" style={{ marginTop: "auto" }}>{data.legalClause}</T>
          </View>
        }
      />
    </StyledPage>
  );
};
