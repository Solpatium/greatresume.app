import { View, Text } from "@react-pdf/renderer";
import React from "react";
import { StylesDefinition } from "../stylesheet";
import { TemplateDetails, ResumeTemplate } from "../types";
import { SingleColumnTemplate } from "../unstyled/singleColumnBase";

const textColor = "#2B364D";
const titleColor = "#378CBB";
const subtitleColor = "#778197";

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
        fontSize: 12,
        fontFamily: "Nunito",
        padding: pageMargin,
        lineHeight: 1.4
    },

    ".headerWrapper": {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: 20,
    },

    ".personalInfo": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    ".personalInfoImage": {
        height: 88,
        width: 88,
        marginBottom: 12,
        borderRadius: "100%",
    },
    ".personalInfoTextWrapper": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },  
    ".personalInfoName": {
        fontFamily: "NotoSerif",
        fontSize: 27,
        fontWeight: 600,
        color: titleColor,
        marginBottom: 4,
    },
    ".personalInfoJobTitle": {
        fontSize: 16,
        fontWeight: 500,
        color: subtitleColor,
    },


    ".contactSection": {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    ".contactSectionTitle": {
        display: "none",
    },
    ".contactEntryWrapper": {
        marginBottom: 8,
        fontSize: 12,
        paddingHorizontal: 8,
    },
    ".contactEntryWrapper.hasSucceeding": {
        borderRight: "0.5px solid #000000",
    },
    ".contactEntryName": {
        textAlign: "right",
        opacity: 0,
        display: "none",
    },
    ".contactEntryValue": {
        textAlign: "right",
        color: textColor,
        textDecoration: "none",
    },


    ".mainSection": {
        marginBottom: 30,
    },
    ".mainSectionTitle": {
        fontSize: 18,
        marginBottom: 12,
        fontWeight: 700,
        color: titleColor,
        fontFamily: "NotoSerif",
    },
    ".mainSectionTitleAfter": {
        marginTop: 6,
        height: 8,
        backgroundColor: "#E0F4FF",
    },

    ".keyValueEntry": {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    ".keyValueSection": {
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
        lineHeight: 1.5,
        fontSize: 12,
    },

    ".experienceEntry.hasSucceeding": {
        marginBottom: 16,
    },
    ".experienceEntryTitle": {
        fontSize: 14,
        fontWeight: 600,
        width: "100%",
    },
    ".experienceEntrySubtitle": {
        fontSize: 12,
        fontStyle: "italic",
        color: "#2B364D",
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
        marginTop: 5,
    },
    ".strong": {
        fontWeight: 900,
    },
    ".textLink": {
        textDecoration: "underline",
    },
    ".em": {
        fontStyle: "italic",
    },
}

export const simpleTemplate: TemplateDetails = {
    component: Template,
    fonts: {
        NotoSerif: ["Regular", "Bold", "Italic", "BoldItalic"],
        Nunito: ["Regular", "Bold", "Light", "Medium", "Italic"],
    },
    styles,
};