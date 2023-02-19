import { Page, View, Text } from "@react-pdf/renderer";
import { width } from "pdfkit/js/page";
import React from "react";
import { TemplateDetails, ResumeTemplate } from "../types";
import { AleksandraBase, AlexandraBaseStyle } from "../unstyled/aleksandraBase";
import { SingleColumnStyle, SingleColumnTemplate } from "../unstyled/singleColumnBase";

const titleColor = "#2a6b32";
const textColor = "#232323";
const bubbleColor = "#eff4f9";

const sectionStyle = {
    marginBottom: 20,
    // border: "solid",
    // borderLeft: "4px",
    // borderColor: "#04411f",
    // paddingLeft: 20,
}

// Important! Paddings can leave just the padding on another page.
const style: SingleColumnStyle = {
    page: {
        color: textColor,
        fontSize: 14,
        fontFamily: "Merriweather",
        fontWeight: 400,
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
    experienceEntry: {
        date: {
            date: {},
            container: {
                flexDirection: "row",
                flexShrink: 0,
                fontSize: "12px",
                // To push it lower
                paddingTop: 2,
            },
        },
        wrapper: {
            gap: 0,
            border: "solid",
            padding: 5,
            paddingLeft: 10,
            paddingBottom: 10,
            borderColor: "#04411f",
            borderLeftWidth: 4,
        },
        titleWrapper: {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 5,
        },
        title: {
            fontSize: 14,
            color: titleColor,
        },
        subtitle: {
            fontSize: 13,
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
            width: "50%",
        },
        name: {
        },
        value: {
            fontWeight: 400,
        },
    },
    contactEntry: {
        wrapper: {
            fontSize: 12,
            marginBottom: 4,
            marginTop: 4,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "50%",
        },
        name: {},
        value: { color: textColor },
    },
    simpleListEntry: { fontSize: 11 },
    textSection: { content: { fontSize: 11 } },
    section: {
        title: {
            // paddingTop: bubbleStyle.padding,
            fontSize: 18,
            // fontWeight: 500,
            letterSpacing: 1,
            marginBottom: 15,
        },
        section: {
            gap: 10,
            ...sectionStyle,
            // paddingTop: 0,
            // padding: 0,
        },
    },
    personalInfo: {
        container: {
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            minHeight: 100,
            marginBottom: 10,
            //   flexGrow: 0,
            //   ...sectionStyle,
        },
        textWrapper: {
            flexGrow: 1,
        },
        image: {
            height: 100,
            width: 100,
            flexGrow: 0,
            marginBottom: 10,
        },
        fullName: {
            fontSize: 22,
            fontWeight: 700,
            color: titleColor,
            marginBottom: 10,
        },
        jobTitle: {
            fontSize: 20,
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
    <SingleColumnTemplate data={data} translate={translate} style={style} />
);

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
};