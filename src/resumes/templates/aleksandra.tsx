import React from "react";
import { TemplateDetails, ResumeTemplate } from "../types";
import { AleksandraBase, AlexandraBaseStyle } from "../unstyled/aleksandraBase";

const textColor = "#2B364D";
const leftBackgroundColor = "#BBD6DD";
const linkColor = "#0a82a1";

const style: AlexandraBaseStyle = {
  page: {
    color: textColor,
    fontSize: "14px",
    fontFamily: "Karla",
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
    padding: "20px",
    width: "30%",
    backgroundColor: leftBackgroundColor,
  },
  rightPane: {
    padding: "20px",
    width: "70%",
  },

  date: {
    date: {},
    container: {
      display: "flex",
      flexDirection: "row",
      flexShrink: 0,
      fontSize: "12px",
      // To push it lower
      paddingTop: "2px",
    },
  },
  experienceEntry: {
    wrapper: {
      marginBottom: "20px",
    },
    titleWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: "5px",
    },
    title: {
      fontSize: "14px",
      maxWidth: "300px",
    },
    subtitle: {
      fontSize: "12px",
      fontStyle: "italic",
    },
    description: {
      fontSize: "11px",
    },
  },
  keyValueEntry: {
    wrapper: {},
    name: {},
    value: {},
  },
  contactEntry: {
    wrapper: {fontSize: 12, marginBottom: 4},
    name: {},
    value: {color: linkColor},
  },
  simpleListEntry: {fontSize: 11},
  textSection: {content: {fontSize: 11}},
  sidebarSection: {
    title: {
      fontSize: 14,
      fontWeight: 400,
      marginBottom: 5,
    },
    section: {
      marginBottom: 20,
      width: "100%",
      fontSize: 12, 
      fontWeight: 300,
    },
  },
  mainSection: {
    title: {
      fontSize: 16,
      fontWeight: 500,
      marginBottom: 10,
    },
    section: {
      marginBottom: "20px",
      width: "100%",
    },
  },
  personalInfo: {
    container: {
      display: "flex",
      alignItems: "center",
      marginBottom: 20,
    },
    image: {
      width: "80%",
      maxHeight: "200px",
      marginBottom: "20px",
    },
    fullName: {
      textAlign: "center",
      width: "100%",
      paddingBottom: "5px",
      marginBottom: "5px",
      borderColor: textColor,
      fontSize: 20,
      fontFamily: "Karla",
      fontWeight: 500,
    },
    jobTitle: {
      fontSize: 14,
      fontWeight: 300,
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
};
