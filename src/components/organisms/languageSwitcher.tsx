import { LanguageIcon } from "@heroicons/react/24/outline";
import { Button } from "../atoms/button";
import { useToggle } from "react-use";
import { BigModal } from "../layout/bigModal";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FlatSelect } from "../atoms/flatSelect";
import { useHistoryPush } from "../../utils/hooks";
import { useMemo } from "react";

const langs = [
    "en",
    "fr",
    "pl",
];

const historyKey = "language-switch";

export const LanguageSwitcher: React.FC = () => {
    const [open, toggle] = useToggle(false);
    const { t } = useTranslation("common");
    const { replace, pathname, asPath, query, locale } = useRouter();
    const { maybePop } = useHistoryPush(historyKey, () => {});
    
    const languages = useMemo(() => {
        const list = langs.map((lang) => ({
            value: lang,
            label: t(`languages.names.${lang}`),
        })); 
        list.sort((a, b) => a.label.localeCompare(b.label));
        return list;
    }, [t]);

    return <>
        <Button
            tertiary
            icon={LanguageIcon}
            largeIcon
            onClick={toggle}
        >{t(`languages.names.${locale}`)}</Button>
        <BigModal title={t`languages.title`} onClose={toggle} show={open} historyKey={historyKey}>
            {/* TODO: moving using keyboard doesn't work. */}
            <FlatSelect
                label={t`languages.label`}
                wrapperClassName="mt-2 grid md:grid-cols-4 grid-cols-2 gap-2"
                options={languages}
                value={locale}
                onChange={(lang) => {
                    // We have to pop the history entry for the modal already to replace the history entry below it.
                    const handler = () => {
                        replace({ pathname, query }, asPath, { locale: lang, })
                        window.removeEventListener("popstate", handler);
                    };
                    window.addEventListener("popstate", handler);
                    maybePop();
                }}
            />
        </BigModal>
    </>;
}