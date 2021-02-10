import React, { useCallback } from "react";
import { Card } from "../atoms/card";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons/lib";

export const StepWrapper: React.FC<{
  goToNext?: () => void;
  goToPrev?: () => void;
  className?: string;
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
        <div className="grid md:grid-cols-6 gap-4">{children}</div>
        <div className="flex col-span-full flex-row-reverse	justify-between mt-4">
          {goToNext && (
            <Button shape="round" type="primary" onClick={goToNext}>
              Next
              <RightOutlined />
            </Button>
          )}
          {goToPrev && (
            <Button shape="round" type="ghost" onClick={goToPrev}>
              <LeftOutlined />
              Prev
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};
