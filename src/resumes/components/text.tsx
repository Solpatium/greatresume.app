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
  // The default hyphenation doesn't care for hyphens included in the text itself.
  // In case of surnames the result doesn't look good. This option breaks the text
  // into seperate parts and adds a soft hyphen to prevent the default hyphenation
  // from working. 
  breakTextByHyphens?: boolean;
}
const SOFT_HYPHEN = '\u00ad';
const wrapHyphens = (input: string): string | string[] => {
  if (!input.includes("-")) {
    return input;
  }
  const parts = input.split("-");
  return parts.map( (s,i) => {
    if (i === parts.length-1) {
      return s+SOFT_HYPHEN;
    }
    return s + "-" + SOFT_HYPHEN;
  })
}

// We don't want to render an empty text component
export const T: React.FC<TProps> = ({ children, url, style, className, breakTextByHyphens, ...props }) => {
  const stylesheet = useContext(styleContext);
  
  let content = children;
  if (typeof children === "string") {
    content = children.trim()
    if (breakTextByHyphens) {
      content = wrapHyphens(children.trim());
    }
  } else if (Array.isArray(children) && breakTextByHyphens){
    // @ts-ignore
    content = children.flatMap(e => {
      if (typeof e === "string") {
        return wrapHyphens(e);
      }
      return e;
    })
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
