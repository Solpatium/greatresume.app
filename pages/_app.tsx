import "tailwindcss/tailwind.css";
import "../src/static/global.sass";
import { Open_Sans } from '@next/font/google'
import React from "react";
import Head from "next/head";
import { GoogleAnalytics } from "../src/utils/analytics";


const open = Open_Sans({ subsets: ['latin'], weight: ["400", "600", "700"], variable: "--font-regular" })



export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#aca8fb" />
      </Head>
      <GoogleAnalytics />
      <div className={`${open.variable}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
