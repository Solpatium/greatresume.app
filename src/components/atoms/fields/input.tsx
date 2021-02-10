import React from "react";
import { Label } from "./label";
import styled from "styled-components";
import { SimpleStateSetter, StateSetter } from "../../../utils/mutators";
import { useCallback } from "react";
import { Input as AntdInput } from "antd";

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
      <Component
        className="rounded-sm"
        value={value}
        onChange={changeHandler}
        size="large "
        disabled={disabled}
      />
      {info && <div className="text-sm font-medium text-gray-500 mt-2">{info}</div>}
    </Label>
  );
};
