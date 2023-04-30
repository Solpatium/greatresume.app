import React, { ReactElement } from "react";
import { Style } from "@react-pdf/types";
import { View } from "@react-pdf/renderer";
import { V } from "./view";
import classNames from "classnames";

export const TitledSection: React.FC<{
  style?: Style;
  className?: string;
  title: ReactElement;
  children: null | ReactElement | (ReactElement | null)[];
}> = ({ style, title, children, className }) => {
  const [firstChild, ...otherChildren] = children instanceof Array ? children.filter(v => v) : [children];

  return (
    <V style={style} className={className}>
      {/*We need to be sure title won't end up alone in the page*/}
      <V wrap={false}>
        {title}
        {firstChild}
      </V>
      {otherChildren}
    </V>
  );
};

export type Entry<DataType> = React.FC<{ data: DataType, className: string }>;

export interface RepeatedEntriesSectionProps<DataType> {
  title: ReactElement;
  component: Entry<DataType>;
  data: DataType[];
  style?: Style & { gap?: number | string };
}

export const RepeatedEntriesSection = <DataType,>(
  props: RepeatedEntriesSectionProps<DataType>,
): ReactElement => (
  <TitledSection style={props.style} title={props.title}>
    {props.data.map((entry, i) => (
      <View style={{ marginBottom: i === props.data.length - 1 ? 0 : props.style?.gap }}>
        <props.component key={i} data={entry} />
      </View>
    ))}
  </TitledSection>
);


export interface RepeatedEntriesProps<DataType> {
  component: Entry<DataType>;
  data: DataType[];
  gap?: number;
}
export const spreadEntries = <DataType,>(
  data: DataType[],
  Component: Entry<DataType>,
): ReactElement[] => data.map((entry, i) => {
  const isFirst = i === 0;
  const isLast = i === data.length - 1;
  const isMiddle = !isFirst && !isLast;
  const isOnly = data.length === 1;
  return (
    <Component
      key={i}
      data={entry}
      className={classNames({
        middle: isMiddle, 
        first: isFirst,
        last: isLast, 
        isOnly: isOnly,
        hasPreceding: !isFirst,
        hasSucceeding: !isLast,
      })} />
  );
});
