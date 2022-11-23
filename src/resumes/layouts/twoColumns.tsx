import React, { ReactElement } from "react";
import { View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

export const TwoColumns: React.FC<{
  left: ReactElement | ReactElement[];
  right: ReactElement | ReactElement[];
  leftWidth?: string;
  rightWidth?: string;
  leftStyle?: Style;
  rightStyle?: Style;
  gap?: string;
}> = ({ left, right, leftWidth, rightWidth, gap, leftStyle, rightStyle }) => {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <View style={[{ width: leftWidth, minHeight: "100vh" }, leftStyle]}>{left}</View>
      <View style={{ width: gap }} />
      <View style={[{ width: rightWidth, minHeight: "100vh" }, rightStyle]}>{right}</View>
    </View>
  );
};
