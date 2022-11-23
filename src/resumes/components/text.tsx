import ReactPDF, { Text } from "@react-pdf/renderer";
import TextProps = ReactPDF.TextProps;
import React from "react";

interface TProps extends TextProps {
  children?: string | string[];
}

// We don't want to render a empty text component
export const T: React.FC<TProps> = (props: TProps) => {
  const content = Array.isArray(props.children) ? props.children.join("") : props.children;
  if (!content?.trim?.()) {
    return null;
  }

  // @ts-ignore
  return <Text {...props} />;
};
