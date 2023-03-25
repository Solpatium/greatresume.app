import ReactPDF, { Link, Text } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import TextProps = ReactPDF.TextProps;
import React, { ReactElement, useContext } from "react";
import { styleContext } from "../stylesheet";
import cn from "classnames";


interface TProps extends TextProps {
  children: string | string[] | ReactElement | ReactElement[];
  url?: string;
  style?: Style;
  className?: string;
}

// We don't want to render an empty text component
export const T: React.FC<TProps> = ({ children, url, style, className, ...props }) => {
  const stylesheet = useContext(styleContext);
  
  let content = children;
  if (typeof children === "string") {
    content = children.trim();
  }
  if (!content) {
    return null;
  }

  const trimmedUrl = url?.trim();

  if (trimmedUrl) {
    return <Link src={trimmedUrl} {...props} style={
      stylesheet(cn(className, "link"), style)
    }><Text>{content}</Text></Link>;
  }

  return <Text style={stylesheet(className, style)} {...props}>{content}</Text>;
};
