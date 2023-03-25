import { Page, View, Text } from "@react-pdf/renderer";
import React from "react";
import { StylesDefinition } from "../stylesheet";
import { TemplateDetails, ResumeTemplate } from "../types";
import { AleksandraBase, AlexandraBaseStyle } from "../unstyled/aleksandraBase";

const titleColor = "#16057C";
const textColor = "#232323";
const bubbleColor = "#eff4f9";

const bubbleStyle = {
  backgroundColor: bubbleColor,
  padding: 20,
  borderRadius: 30,
}

// Important! Paddings can leave just the padding on another page.
const style: AlexandraBaseStyle = {};

const styles: StylesDefinition = {
  ".page": {
    color: textColor,
    fontSize: 14,
    fontFamily: "Poppins",
    padding: 20,
  },

  ".leftPane": {
    width: "35%",
  },
  ".rightPane": {
    width: "65%",
  },

  ".personalInfo": {
    display: "flex",
    marginBottom: 20,
    ...bubbleStyle,
  },
  ".personalInfoImage": {
    width: "100%",
    marginBottom: 10,
    borderRadius: 30,
  },
  ".personalInfoTextWrapper": {
    display: "flex",
    flexDirection: "column-reverse",
  },
  ".personalInfoName": {
    fontSize: 22,
    fontFamily: "Karla",
    fontWeight: 700,
    color: titleColor,
  },
  ".personalInfoJobTitle": {
    fontSize: 14,
    fontWeight: 300,
    marginBottom: 3,
  },

  ".sidebarSection": {
    ...bubbleStyle,
    marginBottom: 20,
    width: "100%",
    fontSize: 12,
    fontWeight: 300,
    gap: 4,
    flexGrow: 0,
    flexShrink: 1,
  },
  ".sidebarSectionTitle": {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 5,
  },

  // Main
  ".mainSection": {
    gap: 10,
    marginBottom: 20,
    ...bubbleStyle,
  },
  ".mainSectionTitle": {
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: 1,
  },


  ".experienceEntry": {
    display: "flex",
    flexDirection: "row",
    flexShrink: 0,
    fontSize: 14,
    color: "#3d4772",
    marginBottom: 4,
  },
  ".experienceEntryTitleWrapper": {
    display: "flex",
    flexDirection: "column-reverse",
    paddingTop: 5,
  },
  ".experienceEntryTitle": {
    fontSize: 14,
    color: titleColor,
    fontWeight: 500,
  },
  ".experienceEntrySubtitle": {
    fontSize: 13,
    fontWeight: 500,
    color: "#000000",
    marginTop: 2,
  },
  ".experienceEntrySubtitle.link": {
    textDecoration: "none",
  },
  ".experienceEntryDescription": {
    fontSize: 12,
    marginTop: 10,
  },
  ".experienceEntryDateWrapper": {
    flexDirection: "row",
    flexShrink: 0,
    fontSize: "12px",
    // To push it lower
    paddingTop: 2,
  },

  ".keyValueEntryName": {
    fontWeight: 500,
  },

  // Contact
  ".contactSection": {
  },
  ".contactSectionTitle": {
  },
  ".contactEntryWrapper": {
    fontSize: 12, marginBottom: 4, marginTop: 4
  },
  ".contactEntryValue": {
    color: textColor, fontWeight: 500
  },

  // Simple list
  ".simpleListEntry": {
    fontSize: 11
  },
  ".textSection": {
    fontSize: 11
  },

  ".legalClause": {
    fontSize: 8,
    fontStyle: "italic",
  },

  // Markdown
  ".li": {
    marginTop: 5,
  }
}

const Template: ResumeTemplate = ({ data, translate }) => (
  <AleksandraBase data={data} translate={translate} columnsGap="20px" style={style} />
);

export const bubblyTemplate: TemplateDetails = {
  component: Template,
  fonts: {
    Poppins: [
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
  title: "Bubbly",
  styles: styles,
};