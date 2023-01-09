import React from "react";

export const StepDescription: React.FC<{ children: React.ReactElement }> = ({ children }) => (
  <p className="col-span-full text-md font-medium text-gray-900">{children}</p>
);
