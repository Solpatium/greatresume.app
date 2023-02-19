import React, { ReactElement } from "react";
import { Style } from "@react-pdf/types";
import { View } from "@react-pdf/renderer";

export const TitledSection: React.FC<{
  style?: Style;
  title: ReactElement;
  children: ReactElement | (ReactElement | null)[];
}> = ({ style, title, children }) => {
  const [firstChild, ...otherChildren] = children instanceof Array ? children.filter(v => v) : [children];

  return (
    <View style={style}>
      {/*We need to be sure title won't end up alone in the page*/}
      <View wrap={false}>
        {title}
        {firstChild}
      </View>
      {otherChildren}
    </View>
  );
};

export type Entry<DataType> = React.FC<{ data: DataType }>;

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
  options: { gap?: number | string }
): ReactElement[] => data.map((entry, i) => (
  <View
    key={i}
    style={{ marginTop: i === 0 ? 0 : options.gap }}
  >
    <Component key={i} data={entry} />
  </View>
));
