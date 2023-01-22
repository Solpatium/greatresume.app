import React, { useCallback } from "react";
import { Card } from "../atoms/card";

export const StepWrapper: React.FC<{
  goToNext?: () => void;
  goToPrev?: () => void;
  className?: string;
  children: React.ReactElement;
}> = ({ className, goToPrev, goToNext, children }) => {
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      goToNext?.();
    },
    [goToNext],
  );
  return (
    <Card
      className={`${className} md:shadow-xl bg-white md:border-solid md:border md:border-gray-200`}>
      <form onSubmit={onSubmit}>
        {children}
        <div className="flex col-span-full flex-row-reverse	justify-between mt-4">
          {goToNext ? (
            <button
              type="button"
              className="text-gray-600 font-bold p-4 rounded-xl hover:bg-gray-100 hover:text-gray-900"
              onClick={goToNext}>
              Next →
            </button>
          ) : (
            <div />
          )}
          {goToPrev && (
            <button
              type="button"
              className="text-gray-600 font-bold p-4 rounded-xl hover:bg-gray-100 hover:text-gray-900"
              onClick={goToPrev}>
              ← Prev
            </button>
          )}
        </div>
      </form>
    </Card>
  );
};
