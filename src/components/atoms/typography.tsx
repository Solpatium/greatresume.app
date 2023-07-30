import React from "react";

export const StepTitle: React.FC<{ children: React.ReactElement | string }> = ({ children }) => (
  <h2 className="text-xl font-semibold my-4 text-slate-800 truncate">{children}</h2>
);


export const StepDescription: React.FC<{ children: React.ReactElement }> = ({ children }) => (
  <p className="col-span-full text-md font-medium text-gray-900 mb-4">{children}</p>
);
