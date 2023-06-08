import { Page, View, Text } from "@react-pdf/renderer";
import React from "react";
import { StylesDefinition } from "../stylesheet";
import { TemplateDetails, ResumeTemplate } from "../types";
import { TwoColumnsBase, TwoColumnsBaseStyle } from "../unstyled/twoColumnsBase";

const titleColor = "#16057C";
const textColor = "#3F4A62";
const accentColor = "#09A979";
const bubbleColor = "#eff4f9";
const labelColor = "#BDC8C5";

// Important! Paddings can leave just the padding on another page.
const style: TwoColumnsBaseStyle = {};

const styles: StylesDefinition = {
  ".page": {
    backgroundColor: "#DCEEE9",
    color: textColor,
    fontSize: 12,
    fontFamily: "Lato",
    padding: 12,
  },
  ".pageInside": {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
  },
  ".leftPane": {
    width: "35%",
  },
  ".rightPane": {
    width: "65%",
  },

  ".personalInfo": {
    display: "flex",
    alignItems: "center",
    marginBottom: 24,
    padding: 12,
  },
  ".personalInfoImage": {
    maxHeight: 100,
    marginBottom: 4,
    borderRadius: 16,
  },
  ".personalInfoTextWrapper": {
    width: "100%"
  },
  ".personalInfoName": {
    color: accentColor,
    textAlign: "center",
    marginBottom: 4,
    fontSize: 22,
    fontWeight: 700,
  },
  ".personalInfoJobTitle": {
    textAlign: "center",
    fontSize: 15,
    color: textColor,
  },

  ".mainSection": {
    marginBottom: 24,
    padding: 12,
    paddingBottom: 0,
    width: "100%",
  },
  ".mainSectionTitle": {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 12,
    color: accentColor
  },

  ".sidebarSection": {
    marginBottom: 12,
    padding: 12
  },
  ".sidebarSectionTitle": {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
    color: accentColor,
  },

  ".experienceEntry.hasSucceeding": {
    marginBottom: 20,
  },
  ".experienceEntryTitleWrapper": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "4px",
  },
  ".experienceEntryTitle": {
    fontWeight: 700,
    fontSize: 13,
    maxWidth: 220,
    color: textColor,
    marginBottom: 4,
  },
  ".experienceEntrySubtitle": {
    fontSize: 12,
    marginBottom: 8,
    fontStyle: "italic",
    color: textColor,
    textDecoration: "none",
  },
  ".experienceEntrySubtitle.link": {},
  ".experienceEntryDescription": {
    fontSize: 12,
    lineHeight: 1.4,
  },
  ".dateSeparatorWrapper": {
    marginLeft: 4,
    marginRight: 4,
  },
  ".experienceEntryDateWrapper": {
    display: "flex",
    flexDirection: "row",
    flexShrink: 0,
    fontSize: "12px",
    // To push it lower
    paddingTop: "2px",
    color: labelColor,
  },

  ".keyValueEntry": { fontSize: 12, marginBottom: 8 },
  ".keyValueEntryName": { marginRight: 5 },
  ".keyValueEntryValue": {},

  ".contactSectionTitle": {},
  ".contactEntryWrapper": { marginBottom: 8, fontSize: 12 },
  ".contactEntryName": { color: labelColor, marginBottom: 2 },
  ".contactEntryValue": { color: textColor, textDecoration: "none" },

  ".simpleListEntry": { fontSize: 12, marginBottom: 8 },
  ".textSection": { fontSize: 12, lineHeight: 1.4 },

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
    color: textColor,//linkColor,
    textDecoration: "none",
  },
  ".em": {
    fontStyle: "italic",
  },
  ".space": {
    height: 10,
  }
}

const Template: ResumeTemplate = ({ data, translate }) => (
  <TwoColumnsBase data={data} translate={translate} columnsGap="20px" style={style} />
);

export const laxTemplate: TemplateDetails = {
  component: Template,
  fonts: {
    Lato: [
      "Bold",
      "BoldItalic",
      "Italic",
      "Light",
      "LightItalic",
      "Regular",
    ],
  },
  styles: styles,
};