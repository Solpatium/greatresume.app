import React, { ReactElement } from "react";
import { Style } from "@react-pdf/types";
import { View } from "@react-pdf/renderer";

export const TitledSection: React.FC<{
  style?: Style;
  title: ReactElement;
  children: ReactElement | ReactElement[];
}> = ({ style, title, children }) => {
  const [firstChild, ...otherChildren] = children instanceof Array ? children : [children];

  if (!firstChild) {
    return null;
  }

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
  style?: Style;
}

export const RepeatedEntriesSection = <DataType,>(
  props: RepeatedEntriesSectionProps<DataType>,
): ReactElement => (
  <TitledSection style={props.style} title={props.title}>
    {props.data.map((entry, i) => (
      <props.component key={i} data={entry} />
    ))}
  </TitledSection>
);
