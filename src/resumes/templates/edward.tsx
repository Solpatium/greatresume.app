import { View } from "@react-pdf/renderer";
import React from "react";
import { StylesDefinition } from "../stylesheet";
import { TemplateDetails, ResumeTemplate } from "../types";
import { SingleColumnTemplate } from "../unstyled/singleColumnBase";

const titleColor = "#009f6f";
const textColor = "#2B364D";
const accentColor = "#615EFF";
const lightColor = "#778197";

const Template: ResumeTemplate = ({ data, translate }) => (
    <SingleColumnTemplate
        style={{
            markdown: {
                unorderedListGlyph: () => <View style={{ marginRight: 8 }}><Text>•</Text></View>
            }
        }}
        data={data}
        translate={translate} />
);

const styles: StylesDefinition = {
    ".page": {
        color: textColor,
        fontSize: 14,
        fontFamily: "Quicksand",
        padding: 40,
    },

    ".headerWrapper": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40,
    },

    ".personalInfo": {
        display: "flex",
        flexDirection: "column",
        minHeight: 100,
        marginBottom: 10,
    },
    ".personalInfoImage": {
        height: 106,
        width: 106,
        marginBottom: 12,
        borderRadius: "100%",
    },
    ".personalInfoName": {
        fontSize: 27,
        fontWeight: 600,
        color: accentColor,
        marginBottom: 4,
    },
    ".personalInfoJobTitle": {
        fontSize: 12,
        fontWeight: 500,
    },


    ".contactSection": {
        flexDirection: "column",
        alignItems: "flex-end",
    },
    ".contactSectionTitle": {
        width: "100%",
        display: "none",
    },
    ".contactEntryWrapper": {
        marginBottom: 8,
        fontSize: 12,
    },
    ".contactEntryName": {
        textAlign: "right",
        width: 250,
        color: lightColor,
    },
    ".contactEntryValue": {
        textAlign: "right",
        color: textColor,
        width: 250,
        textDecoration: "none",
    },


    ".mainSection": {
        marginBottom: 30,
    },
    ".mainSectionTitle": {
        fontSize: 18,
        marginBottom: 12,
        fontWeight: 700,
    },
    ".mainSectionTitleAfter": {
        marginTop: 8,
        width: 24,
        height: 3,
        backgroundColor: accentColor,
        borderRadius: 3,
    },

    ".keyValueEntry": {
        width: "60%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    ".keyValueSection": {
        fontSize: 13,
        fontWeight: 500,
    },

    ".simpleListEntry": {
        fontSize: 13,
        fontWeight: 500,
        lineHeight: 1.4,
        marginBottom: 8,
    },

    ".textSection": {
        fontWeight: 500,
        lineHeight: 1.4,
        fontSize: 12,
    },

    ".experienceEntry": {
        marginBottom: 16,
    },
    ".experienceEntryTitle": {
        fontSize: 12,
        fontWeight: 600,
    },
    ".experienceEntrySubtitle": {
        fontSize: 12,
        color: "#000000",
    },
    ".experienceEntrySubtitle.link": {
        textDecoration: "none",
    },
    ".experienceEntryDescription": {
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1.4,
        marginTop: 8,
    },
    ".experienceEntryTitleWrapper": {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    ".experienceEntryDateWrapper": {
        color: "#778197",
        flexDirection: "row",
        flexShrink: 0,
        fontSize: "12px",
    },
    ".dateSeparatorWrapper": {
        marginLeft: 4,
        marginRight: 4,
    },

    ".legalClause": {
        fontSize: 7,
        lineHeight: 1.2
    },

    ".li": {
        marginTop: 5,
    }
}

export const edwardTemplate: TemplateDetails = {
    component: Template,
    fonts: {
        Quicksand: [
            "Regular",
            "Bold",
            "Light",
            "Medium",
            // "Semibold",
        ],
    },
    title: "Edward",
    styles,
};