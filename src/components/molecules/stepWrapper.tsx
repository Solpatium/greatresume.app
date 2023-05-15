import useTranslation from "next-translate/useTranslation";
import React, { useCallback } from "react";
import { Button } from "../atoms/button";
import { Card } from "../atoms/card";

export const StepWrapper: React.FC<{
  goToNext?: null | (() => void);
  goToPrev?: null | (() => void);
  download?: null | (() => void);
  className?: string;
  title: string;
  id: string;
  children: React.ReactElement | React.ReactElement[];
}> = ({ className, goToPrev, goToNext, download, children, title, id }) => {
  const { t } = useTranslation("app");
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      goToNext?.();
    },
    [goToNext],
  );
  return (
    <div
      id={id}
      className={`${className} md:shadow-xl bg-white px-3 md:px-5 py-5 pb-8 md:border-solid md:border md:border-gray-200 rounded-none md:rounded-xl`}>
      <form onSubmit={onSubmit}>
        <h2 className="text-xl font-semibold my-4 text-slate-800">{title}</h2>
        {children}
        {/* <div className="flex col-span-full flex-row-reverse	justify-between mt-4"> */}
        {/* {goToNext ? (
            <div className="sticky top-0"><Button ghost onClick={goToNext}>
              Next →
            </Button></div>
          ) : (
            download ? <Button ghost onClick={download}>
              <span className="text-lg p-2">
                💾 {t`export`}
              </span>
            </Button> : <div />
          )}
          {goToPrev && (
            <Button ghost onClick={goToPrev}>
              ← Prev
            </Button>
          )} */}
        {/* </div> */}
      </form>
    </div>
  );
};
