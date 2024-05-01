import useTranslation from 'next-translate/useTranslation'
import { useCookieConsent } from '../src/utils/analytics';
import { Button } from '../src/components/atoms/button';
import { ClientOnly } from '../src/components/atoms/clientOnly';
import Trans from 'next-translate/Trans';
import { Header } from '../src/components/sections/header';
import { Footer } from '../src/components/sections/footer';

const Heading: React.FC<{ children: string }> = ({ children }) => <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 mb-6">{children}</h2>

const CurrentConsentOptions: React.FC = () => {
    const [allowCookies, _, reset] = useCookieConsent();
    const { t } = useTranslation("privacy-policy");

    const resetButton = <Button tertiary onClick={() => {
        reset();
        window.location.reload();
    }}>{t`cookies-reset-button`}</Button>;

    if (allowCookies === undefined) {
        return <>{t`cookies-undefined`}</>
    }

    const text = allowCookies ? t`cookies-accepted` : t`cookies-rejected`;
    return <>
        <div className="mb-2">{text} {t`cookies-reset-info`}</div>
        <div>{resetButton}</div>
    </>
}

export default function PrivacyPolicy() {
    const { t } = useTranslation("privacy-policy");
    return (<>
        <title>{t`title`}</title>
        <div className="bg-white px-6 py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                <Header navigation={[]} />
                <h1 className="mt-20 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t`title`}</h1>
                <p className="mt-6 text-xl leading-8">
                    {t`subtitle`}
                </p>
                <div className="mt-10 max-w-2xl">
                    <Heading>{t`info-header`}</Heading>
                    <p><Trans i18nKey="privacy-policy:info-content" components={[<a target="_blank" className="font-semibold text-indigo-600" href="https://policies.google.com/technologies/partner-sites" />]} /></p>
                    <Heading>{t`choice-header`}</Heading>
                    <p><ClientOnly><CurrentConsentOptions /></ClientOnly></p>
                    <Heading>{t`changes-header`}</Heading>
                    <p>{t`changes-content`}</p>
                    <Heading>{t`contact-header`}</Heading>
                    <p>{t`contact-content`}</p>
                </div>
            </div>
        </div>
        <Footer />
    </>
    )
}