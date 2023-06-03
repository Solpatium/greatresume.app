import "tailwindcss/tailwind.css";
import "../src/static/global.sass";
import { Josefin_Sans, Open_Sans } from '@next/font/google'
import React from "react";
import Head from "next/head";
import Script from "next/script";

const josefin = Josefin_Sans({ subsets: ['latin'], weight: ["400", "500", "600", "700"], variable: "--font-fancy" })
const open = Open_Sans({ subsets: ['latin'], weight: ["400", "600", "700"], variable: "--font-regular" })



export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Script strategy="lazyOnload" src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "f99d1b42c59740eeb28fff361d0a5652"}' />
      <div className={`${josefin.variable} ${open.variable}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
