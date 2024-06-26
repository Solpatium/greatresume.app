import React from "react";
import classNames from "classnames";
import { RadioGroup } from "@headlessui/react";
import { labelTextStyle } from "./fields/label";

export interface FlatSelectOption<T> {
  value: T;
  label: string;
  description?: string;
  icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
}

export interface FlatSelectProps<T> {
  label: string;
  options: FlatSelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  wrapperClassName?: string;
}

export const FlatSelect = <T,>({
  options,
  value,
  onChange,
  label,
  wrapperClassName,
}: FlatSelectProps<T>): React.ReactElement => {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Label className={labelTextStyle}>{label}</RadioGroup.Label>
      <div className={wrapperClassName}>
        {options.map(option => (
          <RadioGroup.Option
            key={JSON.stringify(option.value)}
            value={option.value}
            className={({ active }) =>
              classNames(
                active ? "ring-1 ring-offset-2 ring-indigo-500" : "",
                "relative block rounded-lg border border-gray-300 bg-white shadow-sm p-3 sm:px-6 sm:py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none",
              )
            }>
            {({ checked }) => (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  {option.icon &&
                    React.createElement(option.icon, { className: "h-8 w-8" })}
                  <div className="flex items-center">
                    <div className="text-sm">
                      <RadioGroup.Label as="p" className="font-medium text-gray-900">
                        {option.label}
                      </RadioGroup.Label>
                      <RadioGroup.Description as="div" className="text-gray-500">
                        <p className="sm:inline">{option.description}</p>
                      </RadioGroup.Description>
                    </div>
                  </div>
                </div>
                <div
                  className={classNames(
                    checked ? "border-indigo-500" : "border-transparent",
                    "absolute -inset-px rounded-lg border-2 pointer-events-none",
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};
