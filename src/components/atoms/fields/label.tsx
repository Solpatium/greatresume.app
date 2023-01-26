import React from "react";
import cn from "classnames";

export const Label: React.FC<{
  name?: string;
  className?: string;
  target?: string;
  children?: React.ReactNode;
  short?: boolean;
}> = ({ target, className, name, short, children }) => (
  <label htmlFor={target} className={cn("block flex-col", className)}>
    <span className={
      cn(short ? "display-block" : "block", "text-sm font-medium text-gray-700 mb-1")
    }>{name}</span>
    {children}
  </label>
);
