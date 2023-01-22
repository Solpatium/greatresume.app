import "tailwindcss/tailwind.css";
import "../src/static/global.sass";
import React from "react";

export default function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  );
}
