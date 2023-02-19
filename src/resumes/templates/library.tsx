import { View, Text } from "@react-pdf/renderer";
import React from "react";
import { TemplateDetails, ResumeTemplate } from "../types";
import { AleksandraBase, AlexandraBaseStyle } from "../unstyled/aleksandraBase";

const textColor = "#3a4157";
const accentColor = "#858585";
const titleColor = "#3a4045";
const sectionTitleColor = "#202529";
const linkColor = "#3e40cf";

const style: AlexandraBaseStyle = {
  page: {
    color: textColor,
    fontSize: "16px",
    fontFamily: "NotoSerif",
    padding: "16px",
  },
  markdown: {
    list: {
      marginLeft: 10,
    },
    listElement: {
      marginTop: 5,
    },
    strong: {
      fontWeight: 900,
      border: "solid",
      borderColor: "red",
      borderWidth: "2px",
    },
    link: {
      color: linkColor,
      textDecoration: "none",
    },
    em: {
      fontStyle: "italic",
    },
    paragraph: {
    },
    space: {
      height: 10,
    },
    unorderedListGlyph: () => <View style={{marginRight: 8}}><Text>●</Text></View>
  },
  leftPane: {
    width: "25%",
  },
  rightPane: {
    width: "75%",
  },

  experienceEntry: {
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
    wrapper: {
      marginBottom: "20px",
    },
    titleWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: "4px",
    },
    title: {
      fontWeight: "heavy",
      fontSize: "14px",
      maxWidth: "300px",
      color: titleColor,
    },
    subtitle: {
      fontSize: 12,
      marginBottom: 10,
      color: titleColor,
    },
    description: {
      fontSize: "11px",
    },
  },
  keyValueEntry: {
    wrapper: {},
    name: {fontSize: 10, marginRight: 5},
    value: {fontSize: 10},
  },
  contactEntry: {
    wrapper: {marginBottom: 5},
    name: {fontSize: 10 },
    value: {fontSize: 10, color: linkColor},
  },
  simpleListEntry: {fontSize: 11},
  textSection: {content: {fontSize: 11}},
  mainSection: {
    title: {
      fontSize: 16,
      fontWeight: 500,
      marginBottom: "10px",
      paddingBottom: "4px",
      borderBottomStyle: "solid",
      borderColor: accentColor,
      borderBottomWidth: "1px",
      color: sectionTitleColor,
    },
    section: {
      marginBottom: "20px",
      width: "100%",
    },
  },
  sidebarSection: {
    title: {
      fontSize: 11,
      fontWeight: 900,
      marginBottom: 4,
      color: sectionTitleColor,
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
      marginBottom: "20px",
    },
    image: {
      width: "80%",
      maxHeight: "200px",
      marginBottom: "20px",
      borderRadius: "100%",
    },
    fullName: {
      textAlign: "center",
      width: "100%",
      paddingBottom: "5px",
      marginBottom: "5px",
      fontSize: 18,
      fontWeight: 700,
    },
    jobTitle: {
      fontSize: 14,
      color: titleColor,
    },
  },
  legalClause: {
    fontSize: 8,
    fontStyle: "italic",
  },
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
};