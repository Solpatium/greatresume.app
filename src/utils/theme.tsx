import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    white: "#FFF",
    background: "#F4F6FF",
    dark: "#141414",
    accent: "#428DFC",
    action: "#E94A47",
    actionHover: "#fb706d",
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em"
  },
  borderRadius: '10px',
  shadow: '0px 5px 20px 1px rgba(0,0,0,0.15)',
};

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
  }

export const mediaQueries = {
    mobileS: `@media (max-width: ${size.mobileS})`,
    mobileM: `@media (max-width: ${size.mobileM})`,
    mobileL: `@media (max-width: ${size.mobileL})`,
    tablet: `@media (max-width: ${size.tablet})`,
    laptop: `@media (max-width: ${size.laptop})`,
    laptopL: `@media (max-width: ${size.laptopL})`,
    desktop: `@media (max-width: ${size.desktop})`,
    desktopL: `@media (max-width: ${size.desktop})`
}

export const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
