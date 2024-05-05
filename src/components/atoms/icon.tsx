import React from "react";

export const Icon: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ children, className, style }) => (
  <span style={style} className={`${className} inline-block ml-2 mr-2`}>
    {children}
  </span>
);
