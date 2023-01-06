import React from "react";
import cn from "classnames";

export const Label: React.FC<{
  name?: string;
  className?: string;
  target?: string;
  children: React.ReactNode;
}> = ({ target, className, name, children }) => (
  <label htmlFor={target} className={cn("block", className)}>
    <span className="block text-sm font-medium text-gray-700 mb-1">{name}</span>
    {children}
  </label>
);
