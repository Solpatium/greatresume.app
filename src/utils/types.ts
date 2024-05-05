import React from "react";

export type SFC<T = Record<string, never>> = React.FC<
  T & {
    className?: string;
  }
>;
