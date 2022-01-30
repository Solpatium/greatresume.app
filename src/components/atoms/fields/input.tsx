import React, { useCallback } from "react";
import { Label } from "./label";
import { SimpleStateSetter } from "../../../utils/mutators";

export const Input: React.FC<{
  value?: string;
  onChange?: SimpleStateSetter<string>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  info?: string;
}> = ({ className, label, value, onChange, placeholder, disabled, info }) => {
  const changeHandler = useCallback(e => onChange(e.target.value), [onChange]);
  return (
    <Label className={className} name={label}>
      <input
        type="text"
        disabled={disabled}
        value={value}
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
