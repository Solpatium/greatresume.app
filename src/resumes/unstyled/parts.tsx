import { View, Image, Text } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { ExperienceList } from "../../models/sections/experienceSection";
import { KeyValueList } from "../../models/sections/keyValueSection";
import { PersonalInformation } from "../../models/sections/personalInfo";
import { SimpleListEntry } from "../../models/sections/simpleListSection";
import { ResumeModel } from "../../models/v1";
import { Markdown } from "../components/markdown";
import { Date, DateStyle } from "../components/date";
import { spreadEntries, TitledSection } from "../components/sections";
import { T } from "../components/text";

export interface PersonalInfoStyle {
    image: Style;
    container: Style;
    textWrapper: Style;
    fullName: Style;
    jobTitle: Style;
}

export const Introduction: React.FC<{ data: ResumeModel, style: PersonalInfoStyle; image?: string }> = ({ data, style, image }) => (
    <View style={style.container}>
        {image && <Image style={style.image} src={image} />}
        <View style={style.textWrapper}>
            <T style={style.fullName}>
                {data.personalInformation.name} {data.personalInformation.surname}
            </T>
            <T style={style.jobTitle}>{data.personalInformation.jobTitle}</T>
        </View>
    </View>
);


export interface ExperienceEntryStyle {
    wrapper: Style;
    titleWrapper: Style;
    title: Style;
    date: DateStyle,
    // IMPORTANT! This can be a link and should therefore include color
    subtitle: Style;
    description: Style;
}


export const ExperienceEntry: React.FC<{ data: ExperienceList[0], style: ExperienceEntryStyle, markdownStyle }> = ({ data, style, markdownStyle }) => (
    <TitledSection style={style.wrapper} title={
        <>
            <View style={style.titleWrapper}>
                <T style={style.title}>{data.title}</T>
                <Date from={data.from} to={data.to} style={style.date} />
            </View>
            <T style={style.subtitle} url={data.url}>{data.subtitle}</T>
        </>
    }>
        <View style={style.description}>
            <Markdown style={markdownStyle}>{data.description}</Markdown>
        </View>
    </TitledSection>
);

export interface KeyValueEntryStyle {
    wrapper: Style;
    name: Style;
    value: Style;
}


export const ContactInside: React.FC<{
    data: PersonalInformation,
    style: KeyValueEntryStyle,
    phoneLabel: string,
    emailLabel: string
}> = ({ data, style, phoneLabel, emailLabel }) => {
    const email = data.email.trim();
    const phone = data.phone.trim();
    const { links } = data;

    if (!email && !phone && !links.length) {
        return null;
    }

    const entry = (name: string, value: string, url: string): React.ReactElement => (<View style={style.wrapper}>
        <T style={style.name}>{name}</T>
        <T style={style.value} url={url}>{value}</T>
    </View>)

    return (<>
        {phone ? entry(phoneLabel, phone, `tel:${phone}`) : null}
        {email ? entry(emailLabel, data.email, `mailto:${email}`) : null}
        <>{links.map(l => entry(l.name, l.value, l.value))}</>
    </>);
}

const KeyValueEntry: React.FC<{ data: KeyValueList[0], style: KeyValueEntryStyle, }> = ({ data, style }) => {
    return <View style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        ...style.wrapper
    }}>
        <Text style={style.name}>{data.name}</Text>
        <Text style={style.value}>{data.value}</Text>
    </View>
}

export const KeyValueSection: React.FC<{ data: KeyValueList, style: KeyValueEntryStyle, }> = ({ data, style }) => {
    return <>
        {spreadEntries(data, props => <KeyValueEntry {...props} style={style} />, { gap: style.wrapper.gap })}
    </>
}

// TODO gap
export const SimpleListSection: React.FC<{ data: SimpleListEntry[], style: Style, }> = ({ data, style }) => {
    return <>
        {spreadEntries(data, ({ data }) => <Text style={style}>{data.content}</Text>, { gap: 0 })}
    </>
}

