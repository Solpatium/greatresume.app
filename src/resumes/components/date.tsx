import React, { ReactElement } from "react";
import { Text, View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

export const DateSeparator: React.FC = () => <Text>&nbsp;-&nbsp;</Text>;

export interface DateStyle {
  date: Style;
  container: Style;
  dateSeparator?: ReactElement;
}
export interface DateProps {
  from?: string;
  to?: string;
  style: DateStyle;
}

export const Date: React.FC<DateProps> = ({ from, to, style }) => {
  if (!from && !to) {
    return null;
  }
  if (from && to) {
    return (
      <View style={style.container}>
        <Text style={style.date}>{from}</Text>
        {style.dateSeparator ?? <DateSeparator />}
        <Text style={style.date}>{to}</Text>
      </View>
    );
  }
  const date = from || to;
  return (
    <View style={style.container}>
      <Text style={style.date}>{date}</Text>
    </View>
  );
};
