import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { SelectableBox } from "../src/components/atoms/selectableBox";
import useTranslation from "next-translate/useTranslation";
import { ClientOnly } from "../src/components/atoms/clientOnly";

const langs = [
    "en",
    "fr",
    "de",
    "pl",
];

const StorageSettings: React.FC = () => {
    const { t } = useTranslation("languages");
    const { push, query } = useRouter();

    return (
        <div className="flex align-center justify-center min-h-screen">
            <form className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 m-auto max-w-lg text-center">
                <h1 className="font-regular text-medium col-span-full uppercase font-semibold text-gray-600">
                    <span className="text-lg">🌐 </span> {t`pageTitle`}
                </h1>
                <h2 className="font-fancy text-4xl col-span-full mb-0">{t`question`}</h2>
                {langs.map(lang =>
                    <SelectableBox
                        key={lang}
                        onClick={() => {
                            if ("skip-start" in query) {
                                push("/storage-settings?skip-start", undefined, { locale: lang })
                            } else {
                                push("/storage-settings", undefined, { locale: lang })
                            }
                        }}
                        answer={t(`languages.${lang}`)}
                    />
                )}
            </form>
        </div>
    );
};

const Page = () => {
    const { t } = useTranslation("storage-settings");
    return <>
        <Head>
            <title>{t`pageTitle`}</title>
        </Head>
        <ClientOnly>
            <StorageSettings />
        </ClientOnly>
    </>
}


export default Page;