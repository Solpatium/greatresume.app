import React from "react";
import { StylesDefinition } from "../stylesheet";
import { TemplateDetails, ResumeTemplate } from "../types";
import { AleksandraBase, AlexandraBaseStyle } from "../unstyled/aleksandraBase";

const textColor = "#2B364D";
const leftBackgroundColor = "#BBD6DD";
const linkColor = "#0a82a1";

const Template: ResumeTemplate = ({ data, translate }) => (
  <AleksandraBase data={data} translate={translate} columnsGap="20px" />
);

const styles: StylesDefinition = {
  ".page": {
    color: textColor,
    fontSize: "14px",
    fontFamily: "Karla",
  },
  ".leftPane": {
    padding: "20px",
    width: "30%",
    backgroundColor: leftBackgroundColor,
  },
  ".rightPane": {
    padding: "20px",
    width: "70%",
  },

  ".personalInfo": {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  ".personalInfoImage": {
    width: "80%",
    maxHeight: "200px",
    marginBottom: "20px",
  },
  ".personalInfoTextWrapper": { 
    width: "100%"
  },
  ".personalInfoName": {
    textAlign: "center",
    width: "100%",
    paddingBottom: "5px",
    marginBottom: "5px",
    fontSize: 20,
    fontFamily: "Karla",
    fontWeight: 500,
  },
  ".personalInfoJobTitle": {
    fontSize: 14,
    fontWeight: 300,
  },

  ".mainSection": {
    marginBottom: "20px",
    width: "100%",
  },
  ".mainSectionTitle": {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 10,
  },

  ".sidebarSection": {
    marginBottom: 20,
    width: "100%",
    fontSize: 12,
    fontWeight: 300,
  },
  ".sidebarSectionTitle": {
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 5,
  },

  ".experienceEntry": {
    marginBottom: "20px",
  },
  ".experienceEntryTitleWrapper": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "5px",
  },
  ".experienceEntryTitle": {
    fontSize: "14px",
    maxWidth: "300px",
  },
  ".experienceEntrySubtitle": {
    fontSize: "12px",
    fontStyle: "italic",
    color: textColor,
    textDecoration: "none",
  },
  ".experienceEntrySubtitle.link": {},
  ".experienceEntryDescription": {
    fontSize: 11,
  },
  ".experienceEntryDateWrapper": {
    display: "flex",
    flexDirection: "row",
    flexShrink: 0,
    fontSize: "12px",
    // To push it lower
    paddingTop: "2px",
  },

  // TODO: CHECK
  ".keyValueEntryName": { fontSize: 10, marginRight: 5 },
  ".keyValueEntryValue": { fontSize: 10 },

  ".contactSection": {},
  ".contactSectionTitle": {},
  ".contactEntryWrapper": { fontSize: 12, marginBottom: 4 },
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

export const aleksandraTemplate: TemplateDetails = {
  component: Template,
  fonts: {
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
  title: "Aleksandra",
  styles: styles,
};
