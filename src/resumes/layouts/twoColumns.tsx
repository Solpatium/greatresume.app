import React, { ReactElement } from "react";
import { View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

export const TwoColumns: React.FC<{
  left: ReactElement | ReactElement[];
  right: ReactElement | ReactElement[];
  leftStyle: Style;
  rightStyle: Style;
  gap?: string;
}> = ({ left, right, gap, leftStyle, rightStyle }) => {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <View style={[{ minHeight: "100%" }, leftStyle]}>{left}</View>
      <View style={{ width: gap }} />
      <View style={[{ minHeight: "100%" }, rightStyle]}>{right}</View>
    </View>
  );
};
