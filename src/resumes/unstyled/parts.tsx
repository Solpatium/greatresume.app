import { View, Image, Text } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { ExperienceList } from "../../models/sections/experienceSection";
import { KeyValueList } from "../../models/sections/keyValueSection";
import { PersonalInformation } from "../../models/sections/personalInfo";
import { SimpleListEntry } from "../../models/sections/simpleListSection";
import { ResumeModel } from "../../models/v1";
import { Markdown, MarkdownStyle } from "../components/markdown";
import { Date, DateStyle } from "../components/date";
import { spreadEntries, TitledSection } from "../components/sections";
import { T } from "../components/text";
import { V } from "../components/view";
import cn from "classnames";
import { ReactElement } from "react";
import { Img } from "../components/image";

export const Introduction: React.FC<{ data: ResumeModel, image?: string }> = ({ data, image }) => (
    <V className="personalInfo">
        <Img image={image} className="personalInfoImage" />
        <V className="personalInfoTextWrapper">
            <T className="personalInfoName" breakTextByHyphens>
                {data.personalInformation.name} {data.personalInformation.surname}
            </T>
            <T className="personalInfoJobTitle">{data.personalInformation.jobTitle}</T>
        </V>
    </V>
);


export const ExperienceEntry: React.FC<{ data: ExperienceList[0], className: string, markdownStyle?: MarkdownStyle }> = ({ data, style, markdownStyle, className }) => (
    <TitledSection className={cn(className, "experienceEntry")} title={
        <>
            <V className="experienceEntryTitleWrapper">
                <V className="experienceEntryTitle"><T>{data.title}</T></V>
                <Date name="experienceEntryDate" from={data.from} to={data.to} />
            </V>
            <T className="experienceEntrySubtitle">{data.subtitle}</T>
        </>
    }>
        {data.description.trim() ? <V className="experienceEntryDescription">
            <Markdown style={markdownStyle}>{data.description}</Markdown>
        </V> : null}
    </TitledSection>
);

export interface KeyValueEntryStyle {
    wrapper: Style;
    name: Style;
    value: Style;
}


export const ContactInside: React.FC<{
    data: PersonalInformation,
    style?: KeyValueEntryStyle,
    phoneLabel: string,
    emailLabel: string
}> = ({ data, style, phoneLabel, emailLabel }) => {
    const email = data.email.trim();
    const phone = data.phone.trim();
    const { entries } = data;

    if (!email && !phone && !entries.length) {
        return null;
    }

    const wholeData = [];
    if (phone) {
        wholeData.push({ name: phoneLabel, value: phone, url: `tel:${phone}` });
    }
    if (email) {
        wholeData.push({ name: emailLabel, value: email, url: `mailto:${email}` });
    }
    wholeData.push(...entries);

    return spreadEntries(wholeData, ({ data, className }) => (<V style={style?.wrapper} className={`${className} contactEntryWrapper`}>
        <T style={style?.name} className="contactEntryName">{data.name}</T>
        <T style={style?.value} className="contactEntryValue" url={"url" in data ? data.url : data.value}>{data.value}</T>
    </V>));
}

const KeyValueEntry: React.FC<{ data: KeyValueList[0], style?: KeyValueEntryStyle, className: string }> = ({ data, style, className }) => {
    return <V
        style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            ...(style?.wrapper ?? {}),
        }}
        className={cn("keyValueEntry", className)}
    >
        <T style={style?.name} className="keyValueEntryName">{data.name}</T>
        <T style={style?.value} className="keyValueEntryValue">{data.value}</T>
    </V>
}

export const KeyValueSection: React.FC<{ data: KeyValueList, style?: KeyValueEntryStyle, }> = ({ data, style }) => {
    return <>
        {spreadEntries(data, props => <KeyValueEntry {...props} style={style} />)}
    </>
}

// TODO gap
export const SimpleListSection: React.FC<{ data: SimpleListEntry[], style?: Style, }> = ({ data, style }) => {
    return <>
        {spreadEntries(data, ({ data, className }) =>
            <T className={cn("simpleListEntry", className)} style={style}>
                {data.content}
            </T>
        )}
    </>
}

const SectionWrapper: React.FC<{ className: string, title: string, children: ReactElement | ReactElement[], prefix: string }> = ({ title, children, className, prefix }) => {
    let first: ReactElement | ReactElement[], rest: ReactElement[];
    if (Array.isArray(children) && children[0]) {
        [first, ...rest] = children;
    } else {
        first = children;
        rest = [];
    }

    return (<V
        className={cn(`${prefix}Section`, className)}
    >
        <View wrap={false} style={{ width: "100%" }}>
            <V wrap={false} className={`${prefix}SectionTitle ${className}Title`}>
                <V className={`${prefix}SectionTitleBefore`} showEmpty />
                <T className={`${prefix}SectionTitleText ${className}TitleText`}>{title}</T>
                <V className={`${prefix}SectionTitleAfter`} showEmpty />
            </V>
            {first}
        </View>
        {rest}
    </V>);
};


export const MainSectionWrapper: React.FC<{ className: string, title: string, children: ReactElement | ReactElement[] }> = (props) => (<SectionWrapper {...props} prefix="main" />)

export const SidebarSectionWrapper: React.FC<{ className: string, title: string, children: ReactElement | ReactElement[] }> = (props) => (<SectionWrapper {...props} prefix="main" />)

export const ExperienceSection: React.FC<{ title: string, data: ExperienceList, markdownStyle?: MarkdownStyle }> = ({ title, data, markdownStyle }) => {
    return <MainSectionWrapper title={title} className="experienceSection">
        {spreadEntries(
            data,
            props => <ExperienceEntry {...props} markdownStyle={markdownStyle} />,)
        }
    </MainSectionWrapper>
}
