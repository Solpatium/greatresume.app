import React, { useCallback } from "react";

export const StepWrapper: React.FC<{
  className?: string;
  title: string;
  id: string;
  children: React.ReactElement | React.ReactElement[];
}> = ({ className, children, title, id }) => {
  return (
    <div
      id={id}
      className={`${className} md:shadow-xl bg-white px-3 md:px-5 py-5 pb-8 md:border-solid md:border md:border-gray-200 rounded-none md:rounded-xl`}>
        <h2 className="text-xl font-semibold my-4 text-slate-800">{title}</h2>
        {children}
    </div>
  );
};
