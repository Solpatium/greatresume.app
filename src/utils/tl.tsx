import React, { CSSProperties } from "react";

export const tl = <T extends { className?: string; style?: CSSProperties }>(
  Component: React.FC<T> | "div" | "span",
  className?: string,
  style?: CSSProperties,
): React.FC<T> => (props: T) =>
  React.createElement(Component, {
    ...props,
    className: `${className} ${props.className || ""}`,
    style: { ...style, ...(props.style || {}) },
  });
