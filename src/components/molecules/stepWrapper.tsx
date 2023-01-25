import useTranslation from "next-translate/useTranslation";
import React, { useCallback } from "react";
import { Button } from "../atoms/button";
import { Card } from "../atoms/card";

export const StepWrapper: React.FC<{
  goToNext?: null | (() => void);
  goToPrev?: null | (() => void);
  download?: null | (() => void);
  className?: string;
  children: React.ReactElement;
}> = ({ className, goToPrev, goToNext, download, children }) => {
  const { t } = useTranslation("app");
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
            <Button ghost onClick={goToNext}>
              Next →
            </Button>
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
          )}
        </div>
      </form>
    </Card>
  );
};
