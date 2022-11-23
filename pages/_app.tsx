import "tailwindcss/tailwind.css";
import "../src/static/global.sass";
import { Theme } from "../src/utils/theme";
import React from "react";

export default function MyApp({ Component, pageProps }) {
  return (
    <Theme>
      <Component {...pageProps} />
    </Theme>
  );
}
