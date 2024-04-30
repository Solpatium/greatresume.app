import React, { useState } from "react";
import cn from "classnames";
import { TrashIcon } from "@heroicons/react/24/outline";
import useTranslation from "next-translate/useTranslation";

const common =
  "inline-flex justify-center items-center px-4 py-3 border text-sm font-bold rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
const colors = {
  danger: `${common} bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 text-white `,
  primary: `${common} rounded-lg bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white`,
  secondary: `${common} rounded-lg bg-indigo-50 text-indigo-600 shadow-sm hover:bg-indigo-100`,
  tertiary: `${common} rounded-lg bg-white hover:bg-gray-50 border-gray-300 focus:ring-indigo-500 text-gray-600`,
};

export const Button: React.FC<{
  danger?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  onClick?: () => void | Promise<any>;
  type?: "button" | "submit";
  icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  largeIcon?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ danger, onClick, secondary, tertiary, type, children, icon, disabled, className, ...rest }) => {
  const [inProgress, setInProgress] = useState(false);

  const variant =
    (danger && colors.danger) ||
    (secondary && colors.secondary) ||
    (tertiary && colors.tertiary) || 
    colors.primary;

  return (
    <button
      disabled={disabled || inProgress}
      onClick={() => {
        const result = onClick?.();
        if (result) {
          setInProgress(true);
          Promise.resolve(result).finally(() => setInProgress(false));
        }
      }}
      type={type ?? "button"}
      className={cn(variant, (disabled || inProgress) && "opacity-50 pointer-events-none", className)}
      {...rest}>
      {icon && !rest.largeIcon && React.createElement(icon, { className: "h-4 w-4 mr-2 -ml-0.5" })}
      {icon && rest.largeIcon && React.createElement(icon, { width: 20, style: { strokeWidth: 2 }, className: "mr-2 -ml-0.5"})}
      {children}
    </button>
  );
};


export const DeleteButton: React.FC<{onClick: () => void, className?: string}> = ({onClick, className}) => {
  const {t} = useTranslation("app");
  return <button
    onClick={onClick}
    type="button"
    aria-label={t`delete`}
    className={cn("inline-flex items-center rounded-full p-2 text-pink-600", className)}
  >
    <TrashIcon className="h-5 w-5" aria-hidden="true" />
  </button>
}