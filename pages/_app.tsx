import "tailwindcss/tailwind.css";
import "../src/static/global.sass";
import { Open_Sans } from "next/font/google"
import React from "react";
import Head from "next/head";
import { GoogleAnalytics } from "../src/utils/analytics";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";


const open = Open_Sans({ subsets: ['latin'], weight: ["400", "600", "700"], variable: "--font-regular" })



export default function MyApp({ Component, pageProps }) {
  const {locale} = useRouter();
  const {t} = useTranslation("common");
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>
        <link rel="manifest" href="/favicons/site.webmanifest"/>
        <meta name="theme-color" content="#fff6f0" />
        <meta name="description" content={t("description")} />
        <meta property="og:locale" content={locale} />
        <meta property="og:locale:alternate" content="fr" />
        <meta property="og:locale:alternate" content="pl" />
        <meta property="og:locale:alternate" content="en" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`https://greatresume.app/images/og/${locale}.png`} />
      </Head>
      <GoogleAnalytics />
      <div className={`${open.variable}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
