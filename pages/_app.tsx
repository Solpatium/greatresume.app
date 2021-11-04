import "tailwindcss/tailwind.css";
import "../src/static/global.sass";
import { Theme } from "../src/utils/theme";
import "antd/dist/antd.css";
import "react-quill/dist/quill.snow.css";
import "../styles.css";
import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#428dfc",
      light: "#81bdff",
      dark: "#0060c8",
    },
    secondary: {
      main: "#4b5663",
      light: "#778291",
      dark: "#222d39",
    },
  },
});

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </ThemeProvider>
  );
}
