import "tailwindcss/tailwind.css";
import "../src/static/global.sass";
import { Open_Sans } from '@next/font/google'
import React from "react";
import Head from "next/head";
import Script from "next/script";

const open = Open_Sans({ subsets: ['latin'], weight: ["400", "600", "700"], variable: "--font-regular" })



export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#aca8fb" />
      </Head>
      <Script strategy="lazyOnload" src='https://plausible.io/js/script.js' data-domain="greatresume.app" />
      <div className={`${open.variable}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
