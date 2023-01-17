import ReactPDF, { Link, Text } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import TextProps = ReactPDF.TextProps;
import React from "react";


interface TProps extends TextProps {
  children: string | string[];
  url?: string;
  style?: Style | Style[];
}

// We don't want to render an empty text component
export const T: React.FC<TProps> = ({ children, url, style, ...props }) => {
  style = style ?? {};
  const content = Array.isArray(children) ? children.join("").trim() : children.trim();

  if (!content) {
    return null;
  }

  const trimmedUrl = url?.trim();

  if (trimmedUrl) {
    const toAdd: Style = {textDecoration: "none"};
    const newStyle = style instanceof Array ? [toAdd, ...style] : {...toAdd, ...style};
    return <Link src={trimmedUrl} {...props} style={newStyle}><Text>{content}</Text></Link>;
  }

  return <Text style={style} {...props}>{content}</Text>;
};
