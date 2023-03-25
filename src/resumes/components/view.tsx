import ReactPDF, { Link, Text, View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import ViewProps = ReactPDF.ViewProps;
import React, { useContext } from "react";
import { styleContext } from "../stylesheet";
import cn from "classnames";


interface TProps extends ViewProps {
  children?: React.ReactElement | React.ReactElement[];
  style?: Style;
  className?: string;
  showEmpty?: boolean;
}

export const V: React.FC<TProps> = ({ children, style, className, showEmpty, ...props }) => {
  const stylesheet = useContext(styleContext);

  if (!children && !showEmpty) {
    return null;
  }

  return <View style={stylesheet(className, style)} {...props}>{children}</View>;
};
