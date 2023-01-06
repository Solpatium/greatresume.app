import ReactPDF, { Text } from "@react-pdf/renderer";
import TextProps = ReactPDF.TextProps;
import React from "react";

interface TProps extends TextProps {
  children?: string | string[];
}

// We don't want to render an empty text component
export const T: React.FC<TProps> = ({ children, ...props }) => {
  const content = Array.isArray(children) ? children.join("").trim() : children.trim();

  if (!content) {
    return null;
  }

  // @ts-ignore
  return <Text {...props}>{content}</Text>;
};
