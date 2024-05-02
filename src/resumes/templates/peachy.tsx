import { View, Text } from "@react-pdf/renderer";
import React from "react";
import { StylesDefinition } from "../stylesheet";
import { TemplateDetails, ResumeTemplate } from "../types";
import { SingleColumnTemplate } from "../unstyled/singleColumnBase";

const textColor = "#2B364D";
const titleColor = "#F17820";
const subtitleColor = "#F6A367";

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

const pageMargin = 40;
const styles: StylesDefinition = {
    ".page": {
        color: textColor,
        backgroundColor: "#FFFEFD",
        fontSize: 14,
        fontFamily: "Manrope",
        padding: pageMargin,
    },

    ".headerWrapper": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: pageMargin,
        backgroundColor: "#FFF4E4",
        marginHorizontal: -pageMargin,
        marginTop: -pageMargin,
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
        color: titleColor,
        marginBottom: 4,
    },
    ".personalInfoJobTitle": {
        fontSize: 12,
        fontWeight: 500,
        color: subtitleColor,
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
        color: subtitleColor,
    },
    ".contactEntryValue": {
        textAlign: "right",
        color: titleColor,
        width: 250,
        textDecoration: "none",
    },


    ".mainSection": {
        marginTop: 32,
    },
    ".mainSectionTitle": {
        fontSize: 18,
        marginBottom: 12,
        fontWeight: 700,
        color: titleColor,
    },

    ".keyValueEntry": {
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

    ".experienceEntry.hasSucceeding": {
        marginBottom: 16,
    },
    ".experienceEntryTitle": {
        fontSize: 12,
        fontWeight: 600,
        width: "100%",
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
        color: subtitleColor,
        flexDirection: "row",
        flexShrink: 0,
        fontSize: "12px",
        width: 280,
        justifyContent: "flex-end",
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
        marginTop: 0,
    },

    ".strong": {
        fontWeight: 900,
    },
    ".textLink": {
        textDecoration: "underline",
    },
    ".em": {
        fontWeight: 300,
    },
}

export const peachyTemplate: TemplateDetails = {
    component: Template,
    fonts: {
        Manrope: ["Regular", "Bold", "ExtraBold", "ExtraLight", "Light", "Medium", "SemiBold"]
    },
    styles,
};