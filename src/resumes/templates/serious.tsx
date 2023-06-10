import { View, Text } from "@react-pdf/renderer";
import React from "react";
import { StylesDefinition } from "../stylesheet";
import { TemplateDetails, ResumeTemplate } from "../types";
import { TwoColumnsBase, TwoColumnsBaseStyle } from "../unstyled/twoColumnsBase";

const textColor = "#2B364D";
const titleColor = "#2B364D";
const labelColor = "#778197";
const sectionTitleColor = "#202529";
const linkColor = "#3e40cf";

const style: TwoColumnsBaseStyle = {
  markdown: {
    unorderedListGlyph: () => <View style={{ marginRight: 8, fontFamily: "NotoSerif"}}><Text>●</Text></View>
  },
};

const styles: StylesDefinition = {
  ".page": {
    color: textColor,
    fontSize: 13,
    fontFamily: "CrimsonPro",
    padding: 24,
  },
  ".leftPane": {
    width: "32%",
    paddingRight: 24,
  },
  ".rightPane": {
    width: "68%",
    paddingLeft: 24,
  },

  ".personalInfo": {
    display: "flex",
    alignItems: "center",
    marginBottom: 24,
  },
  ".personalInfoImage": {
    maxHeight: 120,
    marginBottom: 24,
    borderRadius: "100%",
  },
  ".personalInfoTextWrapper": {
    width: "100%"
  },
  ".personalInfoName": {
    width: "100%",
    color: titleColor,
    marginBottom: 4,
    fontSize: 22,
    fontWeight: 700,
    fontFamily: "NotoSerif",
  },
  ".personalInfoJobTitle": {
    fontSize: 15,
    color: titleColor,
  },

  ".mainSection": {
    marginBottom: "20px",
    width: "100%",
  },
  ".mainSectionTitle": {
    fontFamily: "NotoSerif",
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 12,
    paddingBottom: 4,
    borderBottomStyle: "solid",
    borderColor: textColor,
    borderBottomWidth: 0.5,
    color: sectionTitleColor,
  },

  ".sidebarSection": {
    marginBottom: 24,
    width: "100%",
  },
  ".sidebarSectionTitle": {
    fontFamily: "NotoSerif",
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
    color: titleColor,
  },

  ".experienceEntry.hasSucceeding": {
    marginBottom: 16,
  },
  ".experienceEntryTitleWrapper": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 4,
  },
  ".experienceEntryTitle": {
    width: "100%",
    fontWeight: 700,
    fontSize: 13,
    color: titleColor,
  },
  ".experienceEntrySubtitle": {
    fontSize: 13,
    marginBottom: 8,
    color: titleColor,
    textDecoration: "none",
    fontStyle: "italic",
  },
  ".experienceEntryDescription": {
    lineHeight: 1.4,
  },
  ".dateSeparatorWrapper": {
    marginLeft: 4,
    marginRight: 4,
  },
  ".experienceEntryDateWrapper": {
    color: labelColor,
    justifyContent: "flex-end",
    display: "flex",
    flexDirection: "row",
    flexShrink: 0,
    fontSize: 11,
    width: 200,
    paddingTop: 2,
  },

  ".keyValueEntry": {marginBottom: 8},
  ".keyValueEntryName": { marginRight: 5 },
  ".keyValueEntryValue": {  },

  ".contactSection": {},
  ".contactSectionTitle": {},
  ".contactEntryWrapper": { marginBottom: 8, fontFamily: "CrimsonPro"},
  ".contactEntryName": { fontSize: 11, color: labelColor, marginBottom: 2 },
  ".contactEntryValue": { fontSize: 13, color: textColor, textDecoration: "none" },

  ".simpleListEntry": { marginBottom: 8 },
  ".textSection": { fontSize: 11, lineHeight: 1.4 },

  ".legalClause": {
    fontSize: 7,
  },

  ".ul": {
    marginLeft: 10,
  },
  ".li": {
    marginTop: 5,
  },
  ".strong": {
    fontWeight: 900,
  },
  ".textLink": {
    color: linkColor,
    textDecoration: "none",
  },
  ".em": {
    fontStyle: "italic",
  },
  ".space": {
    height: 10,
  }
};

const Template: ResumeTemplate = ({ data, translate }) => (
  <TwoColumnsBase data={data} translate={translate} style={style} columnsGap="0" />
);

export const seriousTemplate: TemplateDetails = {
  component: Template,
  fonts: {
    NotoSerif: ["Regular", "Bold", "Italic", "BoldItalic"],
    CrimsonPro: ["Regular", "Italic", "Bold"],
  },
  styles: styles,
};