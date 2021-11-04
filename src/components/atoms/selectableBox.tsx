import React from "react";
import cn from "classnames";
import { SFC } from "../../utils/typs";

export const SelectableBox: SFC<{
  onClick?: () => void;
  answer: string;
  explanation: string;
  wrapper?: string;
}> = ({ answer, onClick, explanation, className, wrapper }) => {
  const component = wrapper ?? "button";
  return React.createElement(
    component,
    {
      type: component === "button" ? "button" : undefined,
      onClick,
      className: cn(
        "group grid gap-4 bg-white p-8 rounded-xl shadow-md hover:shadow-lg w-full",
        className,
      ),
    },
    <div className="font-regular text-xl font-bold text-gray-800 group-hover:underline">
      {answer}
    </div>,
    <div className="font-regular text-sm">{explanation}</div>,
  );
};
