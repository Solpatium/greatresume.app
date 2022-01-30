import { Image, Link, Page, StyleSheet, Text, View, Font } from "@react-pdf/renderer";
import { TwoColumns } from "../layouts/twoColumns";
import React from "react";
import { ResumeTemplate } from "../types";

const textColor = "#2B364D";
const leftBackgroundColor = "#BBD6DD";
//
// Font.register({
//   family: "Oswald",
//   src: "https://fonts.gstatic.com/s/rochester/v6/bnj8tmQBiOkdji_G_yvypg.ttf",
// });

const styles = StyleSheet.create({
  page: {
    color: textColor,
  },

  // Left
  left: {
    padding: "20px",
    backgroundColor: leftBackgroundColor,
  },
  image: {
    width: "80%",
    maxHeight: "200px",
    marginBottom: "20px",
  },
  introduction: {
    display: "flex",
    alignItems: "center",
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

  // Right
  right: {
    padding: "20px",
  },
});

const Introduction: ResumeTemplate = ({ data: { image, personalInformation } }) => (
  <View style={styles.introduction}>
    {image && <Image style={styles.image} src={image} />}
    <Text style={styles.fullName}>
      {personalInformation.name} {personalInformation.surname}
    </Text>
    <Text style={styles.jobTitle}>{personalInformation.jobTitle}</Text>
    <Text style={styles.description}>{personalInformation.shortDescription}</Text>
  </View>
);

// const Header: ResumeTemplate = ({ data: { image, personalInformation } }) => (
//   <View>
//     <View style={styles.header}>{image && <Image style={styles.image} src={image} />}</View>
//     <View>
//       <Text>
//         <Text>{personalInformation.name}</Text> <Text>{personalInformation.surname}</Text>
//       </Text>
//     </View>
//     <Text>{personalInformation.jobTitle}</Text>
//     <Text>{personalInformation.shortDescription}</Text>
//     <Link src="https://www.onet.pl">
//       <Text>LINK</Text>
//     </Link>
//   </View>
// );

export const Aleksandra: ResumeTemplate = ({ data }) => {
  const left = <Introduction data={data} />;
  return (
    <Page style={styles.page} size={data.paperSize}>
      <TwoColumns
        left={left}
        right={
          <View>
            <Text>TEST</Text>
          </View>
        }
        leftWidth="30%"
        leftStyle={styles.left}
        rightStyle={styles.right}
      />
    </Page>
  );
};
