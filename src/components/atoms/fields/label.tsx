import styled from "styled-components";
import React from "react";
import cn from "classnames";

const Text = styled.span`
  display: block;
  color: #525974;
  font-weight: 700;
  margin-bottom: 3px;
  letter-spacing: 0.6px;
`;

export const Label: React.FC<{
  name?: string;
  className?: string;
  target?: string;
}> = ({ target, className, name, children }) => (
  <label htmlFor={target} className={cn("block", className)}>
    <span className="block text-sm font-medium text-gray-700 mb-1">{name}</span>
    {children}
  </label>
);
