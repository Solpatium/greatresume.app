import Script from 'next/script'
import { ResumeModel } from "../models/v1";
import { useLocalStorage } from 'react-use';
import { Button } from '../components/atoms/button';
import { useMemo, useTransition } from 'react';
import { ClientOnly } from '../components/atoms/clientOnly';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

declare global {
    interface Window { gtag?: (...args: any) => void }
}

type ConsentValue = boolean | undefined;
export const useCookieConsent: () => ReturnType<typeof useLocalStorage<ConsentValue>> = () => useLocalStorage<ConsentValue>("allow-cookies");

export const GoogleAnalytics: React.FC = () => {
    const id = process.env.NEXT_PUBLIC_ANALYTICS_ID;
    const [allowCookies, setAllowCookies] = useCookieConsent();
    return <>
        <Script
            dangerouslySetInnerHTML={{
                __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');`,
            }}
        />
        {allowCookies && <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />}
        <ClientOnly>
            {allowCookies === undefined ? <CookieBanner onSelect={setAllowCookies} /> : null}
        </ClientOnly>
    </>
}

const track = (name: string, props: Record<string, any>) => {
    window.gtag?.("event", name, props);
}

export const countResumeDownload = (resume: ResumeModel, fileSize: number) => {
    const template = resume.appearance.template;
    const paperSize = resume.appearance.paperSize;
    const usedImage = !!resume.appearance.image;
    const sectionsCount = resume.sections.length;
    track("pdf_download", { template, paperSize, usedImage, sectionsCount, fileSize });
}

const CookieBanner: React.FC<{ onSelect: (answer: boolean) => void }> = ({ onSelect }) => {
    const { t } = useTranslation("common");
    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6 z-[5]">
            <div className="pointer-events-auto max-w-xl rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/10">
                <p className="text-sm leading-6 text-gray-900">
                    <Trans
                        i18nKey="common:cookies.content"
                        components={[<span className="font-semibold" />, <Link href="/privacy-policy" className="font-semibold text-indigo-600" />]}
                    />
                </p>
                <div className="mt-4 flex items-center gap-x-5">
                    <Button onClick={() => onSelect(true)}>{t`cookies.accept`}</Button>
                    <Button tertiary onClick={() => onSelect(false)}>{t`cookies.reject`}</Button>
                </div>
            </div>
        </div>
    )
}