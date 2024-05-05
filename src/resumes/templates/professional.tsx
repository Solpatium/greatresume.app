import { Text, View } from "@react-pdf/renderer";
import React from "react";
import { StylesDefinition } from "../stylesheet";
import { TemplateDetails, ResumeTemplate } from "../types";
import { TwoColumnsBase } from "../unstyled/twoColumnsBase";

const textColor = "#2B364D";
const leftBackgroundColor = "#FBFEFF";
const titleColor = "#056C8C";
const linkColor = "#0a82a1";
const lightColor = "#778197";

const pagePadding = "4vw";
const leftPaneWidth = "38vw";

const background = <View fixed style={{
  position: "absolute",
  width: leftPaneWidth,
  height: "100vh",
  zIndex: -1,
  backgroundColor: leftBackgroundColor
}}/>

const Template: ResumeTemplate = ({ data, translate }) => (
  <TwoColumnsBase
    data={data}
    style={{
      markdown: {
        unorderedListGlyph: () => <View style={{ marginRight: 8 }}><Text>•</Text></View>
      }
    }}
    translate={translate}
    background={background}
    columnsGap="0" />
);

const styles: StylesDefinition = {
  ".page": {
    paddingVertical: pagePadding,
    color: textColor,
    fontSize: "12",
    fontFamily: "Karla",
    backgroundColor: "#F2F9FB",
  },
  ".leftPane": {
    width: "42vw",
  },
  ".rightPane": {
    paddingHorizontal: pagePadding,
    width: "70%",
  },

  ".personalInfo": {
    display: "flex",
    alignItems: "center",
    marginBottom: 32,
  },
  ".personalInfoImage": {
    width: "100%",
    maxHeight: 180,
    maxWidth: 180,
    marginBottom: 32,
    borderRadius: "100%",
  },
  ".personalInfoTextWrapper": {
    width: "100%",
    textAlign: "center",
  },
  ".personalInfoName": {
    fontFamily: "Merriweather",
    color: titleColor,
    textAlign: "center",
    width: "100%",
    fontSize: 25,
    fontWeight: 600,
    marginBottom: 12,
  },
  ".personalInfoJobTitle": {
    fontSize: 12,
    fontWeight: 400,
  },

  ".mainSection": {
    marginBottom: "20px",
    width: "100%",
  },
  ".mainSectionTitle": {
    fontFamily: "Merriweather",
    color: titleColor,
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 12,
  },

  ".sidebarSection": {
    marginBottom: 32,
    width: "100%",
    fontSize: 12,
    fontWeight: 300,
    paddingHorizontal: pagePadding,
  },
  ".sidebarSectionTitle": {
    fontFamily: "Merriweather",
    color: titleColor,
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 12,
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
    fontSize: 12,
    width: "100%",
    flexBasis: "auto",
    fontWeight: 600,
  },
  ".experienceEntryDateWrapper": {
    display: "flex",
    paddingLeft: 5,
    width: 250,
    justifyContent: "flex-end",
    flexDirection: "row",
    flexShrink: 0,
    fontSize: 12,
    color: lightColor,
  },
  ".experienceEntrySubtitle": {
    fontSize: 12,
    fontStyle: "italic",
    color: textColor,
    textDecoration: "none",
    marginBottom: 8,
  },
  ".experienceEntryDescription": {
    fontSize: 12,
    lineHeight: 1.4,
  },
  ".dateSeparatorWrapper": {
    marginLeft: 4,
    marginRight: 4,
  },

  ".keyValueEntry": { marginBottom: 8 },
  ".keyValueEntryName": { fontSize: 13 },
  ".keyValueEntryValue": { fontSize: 13 },

  ".contactSection": {},
  ".contactEntryWrapper": { fontSize: 12, marginBottom: 8 },
  ".contactEntryName": { color: lightColor, marginBottom: 2 },
  ".contactEntryValue": { color: textColor, textDecoration: "none" },

  ".simpleListEntry": { fontSize: 13, marginBottom: 8 },
  ".textSection": { fontSize: 12, lineHeight: 1.4 },

  ".legalClause": {
    fontSize: 7,
    lineHeight: 1.2,
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

export const professionalTemplate: TemplateDetails = {
  component: Template,
  fonts: {
    Merriweather: [
      "Light",
      "LightItalic",
      "Regular",
      "Bold",
      "BoldItalic",
      "Black",
      "BlackItalic",
    ],
    Karla: [
      "ExtraLight",
      "ExtraLightItalic",
      "Light",
      "LightItalic",
      "Regular",
      "Italic",
      "Medium",
      "MediumItalic",
      "SemiBold",
      "SemiBoldItalic",
      "Bold",
      "BoldItalic",
      "ExtraBold",
      "ExtraBoldItalic",
    ],
  },
  styles: styles,
};
