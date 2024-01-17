import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const faqKeys = [
    "dataProcessing", "reimport", "cookieConsent", "bugs", "monetization", "monetizationContinuation", "tracking", "trust",
];

const components = {
    start: <Link className="underline" href="/creator" />,
    em: <em className="font-bold" />,
    githubIssues: <a className="underline" href="#" />,
    sourceCode: <a className="underline" href="#" />,
    plausible: <a className="underline" target="_blank" href="https://plausible.io/" />,
    contact: <a className="underline" href="#" />,
}

export const FAQ = () => {
    return <div id="faq"><QuestionsList
        titleKey="faq.title"
        descriptionKey="faq.description"
        faqKeys={faqKeys.map(entry => `faq.${entry}`)}
    /></div>
}

const QuestionsList: React.FC<{ titleKey: string; descriptionKey: React.ReactElement | string; faqKeys: string[] }> = (props) => {
    const { t } = useTranslation("home");
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:py-40 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-5">
                        <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
                            {t(props.titleKey)}
                        </h2>
                        <p className="mt-4 text-base leading-7 text-gray-600">
                        <Trans i18nKey={`home:${props.descriptionKey}`} components={components} />
                        </p>
                    </div>
                    <div className="mt-10 lg:col-span-7 lg:mt-0">
                        <dl className="space-y-10">
                            {props.faqKeys.map((itemKey) => (
                                <div key={itemKey}>
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <Trans i18nKey={`home:${itemKey}.question`} components={components} />
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">
                                        <Trans i18nKey={`home:${itemKey}.answer`} components={components} />
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
};