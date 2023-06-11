import React, { useCallback } from "react";
import { Label } from "./label";

export const Input: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  info?: string;
  name?: string;
  type?: string;
  autocomplete?: string;
}> = ({ className, label, value, onChange, placeholder, disabled, info, name, type, autocomplete }) => {
  const changeHandler = useCallback(e => onChange?.(e.target.value), [onChange]);
  return (
    <Label className={className} name={label}>
      <input
        name={name}
        type={type ?? "text"}
        autoComplete={autocomplete}
        disabled={disabled}
        defaultValue={value}
        onChange={changeHandler}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder={placeholder}
      />
      {info && (
        <p className="mt-2 text-sm text-gray-500" id="email-description">
          {info}
        </p>
      )}
    </Label>
  );
};
