import React, { useCallback } from "react";
import { Label } from "./label";
import { SimpleStateSetter } from "../../../utils/mutators";
import { OutlinedInput as _Input } from "@material-ui/core";
import { Input as AntdInput } from "antd";
import styled from "styled-components";
export const Component = styled(AntdInput)`
  font-weight: 500;
  padding: 15px 20px;
  border-radius: 0;
  border-radius: 5px;
  border: solid 2px #f3f3f3;
  color: #44352d;
  letter-spacing: 0.25px;
  &.ant-input:hover {
    border: solid 2px #aad2f3 !important;
  }
  &.ant-input:focus,
  &.ant-input-focused {
    box-shadow: none;
    border: solid 2px #40a9ff !important;
  }
`;

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
        name="email"
        id="email"
        disabled={disabled}
        value={value}
        onChange={changeHandler}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder={placeholder}
      />

      {/*<_Input*/}
      {/*  placeholder={placeholder}*/}
      {/*  disabled={disabled}*/}
      {/*  value={value}*/}
      {/*  onChange={changeHandler}*/}
      {/*  fullWidth*/}
      {/*/>*/}
      {info && (
        <p className="mt-2 text-sm text-gray-500" id="email-description">
          {info}
        </p>
      )}
    </Label>
  );
};
