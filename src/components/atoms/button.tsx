import React, { ButtonHTMLAttributes, HTMLAttributes, useCallback, useMemo, useState } from "react";
import cn from "classnames";

const common =
  "inline-flex justify-center items-center px-4 py-3 border text-sm font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
const colors = {
  danger: `${common} bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 text-white `,
  primary: `${common} rounded-lg bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white`,
  secondary: `${common} rounded-lg bg-indigo-50 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100`,
  tertiary: `${common} rounded-lg bg-white hover:bg-gray-50 border-gray-300 focus:ring-indigo-500 text-gray-600`,
  ghost: "text-gray-600 font-bold p-4 rounded-xl hover:bg-gray-100 hover:text-gray-900",
};

const useProgress = (action?: () => void | Promise<any>): [action: undefined | (() => void), inProgress: boolean] => {
  const [inProgress, setInProgress] = useState(false);
  const wrapped = useMemo(() => action && (() => {
    if (inProgress) {
      return;
    }
    const result = action?.();
    if (result) {
      setInProgress(true);
      Promise.resolve(result)
        .finally(() => setInProgress(false))
    }
  }), [action, inProgress]);
  return [wrapped, inProgress]
}

export const Button: React.FC<{
  danger?: boolean;
  secondary?: boolean;
  ghost?: boolean;
  tertiary?: boolean;
  onClick?: () => void | Promise<any>;
  type?: "button" | "submit";
  icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ ghost, danger, onClick, secondary, tertiary, type, children, icon, disabled, className, ...rest }) => {
  const [handleClick, inProgress] = useProgress(onClick);

  const variant =
    (danger && colors.danger) ||
    (secondary && colors.secondary) ||
    (ghost && colors.ghost) ||
    (tertiary && colors.tertiary) || 
    colors.primary;

  return (
    <button
      disabled={disabled || inProgress}
      onClick={handleClick}
      type={type ?? "button"}
      className={cn(variant, (disabled || inProgress) && "opacity-70 pointer-events-none", className)}
      {...rest}>
      {icon && React.createElement(icon, { className: "h-4 w-4 mr-2 -ml-0.5" })}
      {children}
    </button>
  );
};

interface ActionButtonProps {
  children: React.ReactElement,
  onClick?: () => void | Promise<any>,
  icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  className?: string;
  circle?: boolean;
};

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(({ children, onClick, icon, circle, className }, ref) => {
  const [handleClick, inProgress] = useProgress(onClick);
  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      className={cn(
        inProgress ? "bg-indigo-300" : "bg-indigo-600",
        "text-white p-4 px-6 focus:outline-none",
        "text-base font-bold",
        circle ? "rounded-full" : "rounded-xl",
        "shadow-xl",
        "flex items-center justify-center",
        className,
      )}
      disabled={inProgress}
    >
      {icon && React.createElement(icon, { width: 20, style: { strokeWidth: 2 }, className: "mr-2 -ml-0.5" })}
      {children}
    </button>
  );
});