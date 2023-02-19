import { Page, View, Text } from "@react-pdf/renderer";
import React from "react";
import { TwoColumns } from "../layouts/twoColumns";
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
const style: AlexandraBaseStyle = {
  page: {
    color: textColor,
    fontSize: 14,
    fontFamily: "Poppins",
    padding: 20,
  },
  markdown: {
    list: {},
    listElement: {
      marginTop: 5,
    },
    strong: {},
    link: {},
    em: {},
    paragraph: {},
    space: {},
  },
  leftPane: {
    width: "35%",
  },
  rightPane: {
    width: "65%",
  },

  experienceEntry: {
    date: {
      date: {},
      container: {
        display: "flex",
        flexDirection: "row",
        flexShrink: 0,
        fontSize: 14,
        color: "#3d4772",
        marginBottom: 4,
      },
    },
    wrapper: {
      gap: 0,
    },
    titleWrapper: {
      display: "flex",
      flexDirection: "column-reverse",
      paddingTop: 5,
    },
    title: {
      fontSize: 14,
      color: titleColor,
      fontWeight: 500,
    },
    subtitle: {
      fontSize: 13,
      fontWeight: 500,
      color: "#000000",
      marginTop: 2,
    },
    description: {
      fontSize: 12,
      marginTop: 10,
    },
  },
  keyValueEntry: {
    wrapper: {
    },
    name: {
      fontWeight: 500,
    },
    value: {},
  },
  contactEntry: {
    wrapper: { fontSize: 12, marginBottom: 4, marginTop: 4 },
    name: {},
    value: { color: textColor, fontWeight: 500 },
  },
  simpleListEntry: { fontSize: 11 },
  textSection: { content: { fontSize: 11 } },
  sidebarSection: {
    title: {
      fontSize: 14,
      fontWeight: 500,
      marginBottom: 5,
    },
    section: {
      ...bubbleStyle,
      marginBottom: 20,
      width: "100%",
      fontSize: 12,
      fontWeight: 300,
      gap: 4,
      flexGrow: 0,
      flexShrink: 1,
    },
  },
  mainSection: {
    title: {
      // paddingTop: bubbleStyle.padding,
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: 1,
      marginBottom: 15,
    },
    section: {
      gap: 10,
      marginBottom: 20,
      ...bubbleStyle,
      // paddingTop: 0,
      // padding: 0,
    },
  },
  personalInfo: {
    container: {
      display: "flex",
      marginBottom: 20,
      ...bubbleStyle,
    },
    textWrapper: {
      display: "flex",
      flexDirection: "column-reverse",
    },
    image: {
      width: "100%",
      marginBottom: 10,
      borderRadius: 30,
    },
    fullName: {
      fontSize: 22,
      fontFamily: "Karla",
      fontWeight: 700,
      color: titleColor,
    },
    jobTitle: {
      fontSize: 14,
      fontWeight: 300,
      marginBottom: 3,
    },
  },
  legalClause: {
    fontSize: 8,
    fontStyle: "italic",
  },
};

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
};