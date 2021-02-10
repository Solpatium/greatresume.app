import { Label } from "./label";
import React from "react";
import { StateSetter } from "../../../utils/mutators";
import dynamic from "next/dynamic";
import styled from "styled-components";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const StyledQuill = styled(ReactQuill)`
  background: #fff;
  border: solid 2px #f3f3f3;

  &:hover {
    border: solid 2px #aad2f3 !important;
  }
  &:focus {
    border: solid 2px #40a9ff !important;
  }

  .ql-toolbar,
  .ql-container {
    border: 0;
  }

  .ql-container {
    padding: 15px 20px;
  }
  .ql-editor {
    padding: 0;
    color: #44352d;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.25px;
  }
`;

export const RichTextEditor: React.FC<{
  label: string;
  value?: string;
  onChange: StateSetter<string>;
  className?: string;
}> = ({ className, label, onChange, value }) => (
  <Label className={className} name={label}>
    <StyledQuill onChange={onChange} value={value ?? ""} />
  </Label>
);
