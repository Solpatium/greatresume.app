import { Page, View, Text } from "@react-pdf/renderer";
import { width } from "pdfkit/js/page";
import React from "react";
import { StylesDefinition } from "../stylesheet";
import { TemplateDetails, ResumeTemplate } from "../types";
import { AleksandraBase, AlexandraBaseStyle } from "../unstyled/aleksandraBase";
import { SingleColumnStyle, SingleColumnTemplate } from "../unstyled/singleColumnBase";

const titleColor = "#009f6f";
const textColor = "#232323";

const Template: ResumeTemplate = ({ data, translate }) => (
    <SingleColumnTemplate data={data} translate={translate} />
);

const styles: StylesDefinition = {
    ".page": {
        color: textColor,
        fontSize: 14,
        fontFamily: "Merriweather",
        fontWeight: 400,
        padding: 20,
    },

    ".personalInfo": {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        minHeight: 100,
        marginBottom: 10,
    },
    ".personalInfoImage": {
        height: 100,
        width: 100,
        flexGrow: 0,
        marginBottom: 10,
    },
    ".personalInfoTextWrapper": {
        flexGrow: 1,
    },
    ".personalInfoName": {
        fontSize: 22,
        fontWeight: 700,
        color: titleColor,
        marginBottom: 10,
    },
    ".personalInfoJobTitle": {
        fontSize: 20,
        fontWeight: 300,
        marginBottom: 3,
    },


    ".mainSection": {
        marginBottom: 30,
    },
    ".mainSectionTitle": {
        fontSize: 18,
        letterSpacing: 1,
        marginBottom: 20,
    },
    ".mainSectionTitleAfter": {
        marginTop: 5,
        width: 20,
        height: 2,
        backgroundColor: "#009f6f",
    },

    ".contactSection": {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    ".contactSectionTitle": {
        width: "100%",
    },
    ".contactEntryWrapper": {
        width: "45%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        fontWeight: 200,
    },
    ".contactEntryValue": {
        color: textColor,
    },

    ".keyValueEntry": {
        width: "40%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 4,
    },
    ".keyValueSection": {
        fontSize: 12,
        flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between",
    },
    ".keyValueSectionTitle": {
        width: "100%",
    },

    ".simpleListSection": {
        fontSize: 12,
        flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start"
    },
    ".simpleListSectionTitle": {
        width: "100%",
    },
    ".simpleListEntry": {
        width: "23%",
        marginRight: "2%",
        marginBottom: 10,
    },

    ".experienceEntry": {
        border: "solid",
        paddingTop: 5,
        paddingBottom: 5,
        // paddingLeft: 10,
        // borderColor: "#04411f",
        // borderLeftWidth: 4,
    },
    ".experienceEntry.hasPreceding": {
        marginTop: 20,
    },
    ".experienceEntryTitle": {
        color: "#056b33",
    },
    ".experienceEntrySubtitle": {
        fontSize: 13,
        color: "#000000",
        marginTop: 2,
    },
    ".experienceEntrySubtitle.link": {
        textDecoration: "none",
    },
    ".experienceEntryDescription": {
        fontSize: 12,
        marginTop: 10,
        // If parent has this padding then it might be split AFTER the description :/
        paddingBottom: 10,
    },
    ".experienceEntryTitleWrapper": {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 5,
    },
    ".experienceEntryDateWrapper": {
        flexDirection: "row",
        flexShrink: 0,
        fontSize: "12px",
        // To push it lower
        paddingTop: 2,
    },

    ".legalClause": {
        fontSize: 8,
        fontStyle: "italic",
    },

    ".li": {
        marginTop: 5,
    }
}

export const edwardTemplate: TemplateDetails = {
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
    },
    title: "Edward",
    styles,
};