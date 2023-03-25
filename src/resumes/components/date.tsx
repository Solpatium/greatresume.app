import React, { ReactElement } from "react";
import { Text, View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { T } from "./text";
import { V } from "./view";

export const DateSeparator: React.FC = () => <T>&nbsp;-&nbsp;</T>;

export interface DateStyle {
  date: Style;
  container: Style;
  dateSeparator?: ReactElement;
}
export interface DateProps {
  from?: string;
  to?: string;
  style?: DateStyle;
  name?: string;
}

export const Date: React.FC<DateProps> = ({ from, to, style, name }) => {
  if (!from && !to) {
    return null;
  }
  if (from && to) {
    return (
      <V style={style?.container} className={`${name}Wrapper`}>
        <T style={style?.date} className={name}>{from}</T>
        {style?.dateSeparator ?? <DateSeparator />}
        <T style={style?.date}>{to}</T>
      </V>
    );
  }
  const date = from || to;
  return (
    <V style={style?.container} className={`${name}Wrapper`}>
      <T style={style?.date} className={name}>{date ?? ""}</T>
    </V>
  );
};
