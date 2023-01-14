import React, { ReactElement } from "react";
import { TemplateDetails, ResumeTemplate } from "../types";
import { AleksandraBase, AlexandraBaseStyle } from "../unstyled/aleksandraBase";
import ReactPDF from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

const textColor = "#3a4157";
const accentColor = "#545454";

const style: AlexandraBaseStyle = {
  page: {
    color: textColor,
    fontSize: "16px",
    fontFamily: "NotoSerif",
    padding: "16px",
  },
  leftPane: {
    width: "25%",
  },
  rightPane: {
    width: "75%",
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
      marginBottom: "4px",
    },
    title: {
      fontWeight: "heavy",
      fontStyle: "italic",
      fontSize: "14px",
      maxWidth: "300px",
    },
    subtitle: {
      fontSize: 12,
      fontStyle: "italic",
      marginBottom: 10,
    },
    description: {
      fontSize: "11px",
    },
  },
  keyValueEntry: {
    wrapper: {},
    name: {fontSize: 11},
    value: {fontSize: 11},
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
    },
    section: {
      marginBottom: "20px",
      width: "100%",
    },
  },
  sidebarSection: {
    title: {
      fontSize: 12,
      fontWeight: 900,
      marginBottom: 4,
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
    },
    description: {
      fontSize: 12,
      fontWeight: 400,
      marginTop: "15px",
      marginBottom: "15px",
    },
  },
  legalClause: {
    fontSize: 8,
    fontStyle: "italic",
  },
};

const Template: ResumeTemplate = ({ data }) => (
  <AleksandraBase data={data} style={style} columnsGap="20px" />
);

export const libraryTemplate: TemplateDetails = {
  component: Template,
  fonts: {
    NotoSerif: ["Regular", "Bold", "Italic", "BoldItalic"],
  },
  title: "Library",
};
