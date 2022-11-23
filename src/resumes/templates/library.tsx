import React, { ReactElement } from "react";
import { ResumeTemplate } from "../types";
import { AleksandraBase, AlexandraBaseStyle } from "../unstyled/aleksandraBase";

const textColor = "#3a4157";
const accentColor = "#545454";
//
// Font.register({
//   family: "Oswald",
//   src: "https://fonts.gstatic.com/s/rochester/v6/bnj8tmQBiOkdji_G_yvypg.ttf",
// });
const style: AlexandraBaseStyle = {
  page: {
    color: textColor,
    fontSize: "16px",
  },
  leftPane: {
    padding: "16px",
    width: "22%",
  },
  rightPane: {
    padding: "16px",
    width: "78%",
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
  entry: {
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
  mainSection: {
    title: {
      fontSize: "20px",
      fontWeight: 500,
      marginBottom: "10px",
      paddingBottom: "4px",
      borderBottomStyle: "solid",
      borderColor: accentColor,
      borderBottomWidth: "2px",
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
      borderBottom: "solid",
      borderBottomWidth: "2px",
      borderColor: textColor,
      fontSize: "20px",
      fontFamily: "Karla",
      fontWeight: 700,
    },
    jobTitle: {
      fontSize: "16px",
      fontWeight: 600,
    },
    description: {
      fontSize: "12px",
      fontWeight: 400,
      marginTop: "15px",
      marginBottom: "15px",
    },
  },
};

export const Library: ResumeTemplate = ({ data }) => (
  <AleksandraBase data={data} leftWidth="30%" style={style} />
);
