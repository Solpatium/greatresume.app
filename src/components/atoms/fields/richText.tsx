import { Label } from "./label";
import React from "react";

export const RichTextEditor: React.FC<{
  label?: string;
  value?: string;
  onChange: (v: string) => void;
  className?: string;
}> = ({ className, label, onChange, value }) => {
  const textarea = <textarea
    rows={4}
    name="comment"
    id="comment"
    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    value={value}
    onChange={e => onChange(e.target.value)}
  />
  if (!label) {
    return <div className={className}>{textarea}</div>;
  }

  return (
    <Label className={`mb-1 ${className}`} name={label}>
      {textarea}
    </Label>
  );
};
