import React from "react";
import {
  ResumeModel, Section,
} from "../../models/v1";
import { T } from "../components/text";
import { Markdown, MarkdownStyle } from "../components/markdown";
import { PersonalInformation } from "../../models/sections/personalInfo";
import { ContactInside, ExperienceEntry, ExperienceSection, Introduction, KeyValueEntryStyle, KeyValueSection, MainSectionWrapper, PersonalInfoStyle, SimpleListSection } from "./parts";
import { styleContext } from "../stylesheet";
import { V } from "../components/view";
import cn from "classnames";
import { StyledPage } from "../components/page";
import { View } from "@react-pdf/renderer";

export interface SingleColumnStyle {
  markdown?: MarkdownStyle,
}

export interface SingleColumnTemplateProps {
  data: ResumeModel;
  style?: SingleColumnStyle;
  translate: (key: string) => string;
}


export const SingleColumnTemplate: React.FC<SingleColumnTemplateProps> = ({ data, style, translate }) => {
  const image = data.appearance.image;

  const MainSection: React.FC<{ data: Section }> = ({ data }) => {
    if (data.section.type === "experience") {
      return <ExperienceSection markdownStyle={style?.markdown} title={data.title} data={data.section.content} />;
    }
    if (data.section.type === "text") {
      return <MainSectionWrapper title={data.title} className="textSection">
        <Markdown style={style?.markdown}>{data.section.content}</Markdown>
      </MainSectionWrapper>
    }
    if (data.section.type === "key value") {
      return <MainSectionWrapper title={data.title} className="keyValueSection">
        <KeyValueSection data={data.section.content} />
      </MainSectionWrapper>
    }
    if (data.section.type === "simple list") {
      return <MainSectionWrapper title={data.title} className="simpleListSection">
        <SimpleListSection data={data.section.content} />
      </MainSectionWrapper>
    }
    return null;
  }


  return (
    <StyledPage size={data.appearance.paperSize}>
      <View style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
        <V className="headerWrapper">
          <Introduction data={data} image={image} />
          <V className="contactSection">
            <ContactInside
              data={data.personalInformation}
              phoneLabel={translate("phone")} emailLabel={translate("email")}
            />
          </V>
        </V>
        {data.sections.map((s,i) => (<MainSection key={i} data={s} />))}
        <T className="legalClause" style={{ marginTop: "auto" }}>{data.legalClause}</T>
      </View>
    </StyledPage>
  );
};
