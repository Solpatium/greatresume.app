import ReactPDF, { Link, Text } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import TextProps = ReactPDF.TextProps;
import React from "react";


interface TProps extends TextProps {
  children: string | string[];
  url?: string;
  style?: Style;
}

// We don't want to render an empty text component
export const T: React.FC<TProps> = ({ children, url, ...props }) => {
  const content = Array.isArray(children) ? children.join("").trim() : children.trim();

  if (!content) {
    return null;
  }

  const trimmedUrl = url?.trim();

  if (trimmedUrl) {
    return <Link src={trimmedUrl} {...props} style={[{textDecoration: "none"}, props.style ?? {}]}><Text>{content}</Text></Link>;
  }

  return <Text {...props}>{content}</Text>;
};
