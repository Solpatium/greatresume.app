import { View, Text } from "@react-pdf/renderer";
import React from "react";
import { StylesDefinition } from "../stylesheet";
import { TemplateDetails, ResumeTemplate } from "../types";
import { AleksandraBase, AlexandraBaseStyle } from "../unstyled/aleksandraBase";

const textColor = "#3a4157";
const accentColor = "#858585";
const titleColor = "#3a4045";
const sectionTitleColor = "#202529";
const linkColor = "#3e40cf";

const style: AlexandraBaseStyle = {
  markdown: {
    unorderedListGlyph: () => <View style={{ marginRight: 8 }}><Text>●</Text></View>
  },
};

const styles: StylesDefinition = {
  ".page": {
    color: textColor,
    fontSize: "16px",
    fontFamily: "NotoSerif",
    padding: "16px",
  },
  ".leftPane": {
    width: "25%",
  },
  ".rightPane": {
    width: "75%",
  },

  ".personalInfo": {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  ".personalInfoImage": {
    width: "80%",
    maxHeight: "200px",
    marginBottom: "20px",
    borderRadius: "100%",
  },
  ".personalInfoTextWrapper": { 
    width: "100%"
  },
  ".personalInfoName": {
    textAlign: "center",
    width: "100%",
    paddingBottom: "5px",
    marginBottom: "5px",
    fontSize: 18,
    fontWeight: 700,
  },
  ".personalInfoJobTitle": {
    fontSize: 14,
    color: titleColor,
  },

  ".mainSection": {
    marginBottom: "20px",
    width: "100%",
  },
  ".mainSectionTitle": {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: "10px",
    paddingBottom: "4px",
    borderBottomStyle: "solid",
    borderColor: accentColor,
    borderBottomWidth: "1px",
    color: sectionTitleColor,
  },

  ".sidebarSection": {
    marginBottom: "20px",
    width: "100%",
  },
  ".sidebarSectionTitle": {
    fontSize: 11,
    fontWeight: 900,
    marginBottom: 4,
    color: sectionTitleColor,
  },

  ".experienceEntry": {
    marginBottom: "20px",
  },
  ".experienceEntryTitleWrapper": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "4px",
  },
  ".experienceEntryTitle": {
    fontWeight: "heavy",
    fontSize: "14px",
    maxWidth: "300px",
    color: titleColor,
  },
  ".experienceEntrySubtitle": {
    fontSize: 12,
    marginBottom: 10,
    color: titleColor,
  },
  ".experienceEntrySubtitle.link": {},
  ".experienceEntryDescription": {
    fontSize: "11px",
  },
  ".experienceEntryDateWrapper": {
    display: "flex",
    flexDirection: "row",
    flexShrink: 0,
    fontSize: "12px",
    // To push it lower
    paddingTop: "2px",
  },

  ".keyValueEntryName": { fontSize: 10, marginRight: 5 },
  ".keyValueEntryValue": { fontSize: 10 },

  ".contactSection": {},
  ".contactSectionTitle": {},
  ".contactEntryWrapper": { marginBottom: 5, fontSize: 10 },
  ".contactEntryValue": { color: linkColor },

  ".simpleListEntry": { fontSize: 11 },
  ".textSection": { fontSize: 11 },

  ".legalClause": {
    fontSize: 8,
    fontStyle: "italic",
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
  <AleksandraBase data={data} translate={translate} style={style} columnsGap="20px" />
);

export const libraryTemplate: TemplateDetails = {
  component: Template,
  fonts: {
    NotoSerif: ["Regular", "Bold", "Italic", "BoldItalic"],
  },
  title: "Library",
  styles: styles,
};