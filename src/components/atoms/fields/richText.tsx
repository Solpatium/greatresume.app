import { Label } from "./label";
import React from "react";
import { StateSetter } from "../../../utils/mutators";

export const RichTextEditor: React.FC<{
  label: string;
  value?: string;
  onChange: (v: string) => void;
  className?: string;
}> = ({ className, label, onChange, value }) => (
  <Label className={`${className}`} name={label}>
    <div className="mt-1">
      <textarea
        rows={4}
        name="comment"
        id="comment"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  </Label>
);
