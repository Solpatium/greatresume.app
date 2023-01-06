import React from "react";
import cn from "classnames";

const common =
  "inline-flex justify-center items-center px-4 py-2 border text-sm font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
const colors = {
  danger: `${common} bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 text-white `,
  primary: `${common} bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white`,
  secondary: `${common} bg-white hover:bg-gray-50 border-gray-300 focus:ring-indigo-500 text-gray-700`,
  ghost: "text-gray-600 font-bold p-4 rounded-xl hover:bg-gray-100 hover:text-gray-900",
};

export const Button: React.FC<{
  danger?: boolean;
  secondary?: boolean;
  ghost?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  disabled?: boolean;
  children: React.ReactNode;
}> = ({ ghost, danger, onClick, secondary, type, children, icon, disabled }) => {
  const variant =
    (danger && colors.danger) ||
    (secondary && colors.secondary) ||
    (ghost && colors.ghost) ||
    colors.primary;
  const disabledColor = disabled ? "bg-slate-200 hover:bg-slate-200" : "";
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type ?? "button"}
      className={cn(variant, disabledColor)}>
      {icon && React.createElement(icon, { className: "h-4 w-4 mr-2 -ml-0.5" })}
      {children}
    </button>
  );
};
