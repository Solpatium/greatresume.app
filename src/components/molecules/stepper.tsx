import React, { useEffect, useMemo, useState } from "react";
import classes from "classnames";
import { StepWrapper } from "./stepWrapper";

export type Step = {
  title: string;
  element: React.ReactElement;
};
export const Stepper: React.FC<{
  steps: Step[];
  download?: () => void;
}> = ({ steps, download }) => {
  const [activeIndex, setIndex] = useState(0);
  const lastIndex = steps.length - 1;
  const prevIndex: number | null = activeIndex > 0 ? activeIndex - 1 : null;
  const nextIndex: number | null = activeIndex < lastIndex ? activeIndex + 1 : null;
  const [goToPrev, goToNext] = useMemo(
    () => [
      prevIndex != null ? () => setIndex(prevIndex) : null,
      nextIndex != null ? () => setIndex(nextIndex) : null,
    ],
    [prevIndex, nextIndex],
  );

  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    window.scroll(0, 0);
    activeElement?.scrollIntoView?.({ behavior: "smooth", inline: "center" });
  }, [activeElement]);

  const element = steps[activeIndex]?.element;

  // TODO accessibility
  return (
    <>
      <div className="w-full overflow-auto text-left whitespace-nowrap no-scroll">
        {steps.map((s, index) => (
          <button
            key={index}
            type="button"
            ref={index === activeIndex ? setActiveElement : undefined}
            onClick={() => setIndex(index)}
            className={classes(
              "cursor-pointer",
              "inline-block",
              "font-fancy",
              "text-xl",
              "py-4 px-3",
              "m-[2px]",
              {
                "ml-0": index === 0,
                "text-gray-900": activeIndex === index,
                "text-gray-600 hover:text-gray-900 ": activeIndex !== index,
              },
              "focus-visible:outline-blue",
            )}>
            <span
              className={classes("pb-1", {
                "border-b-solid border-b-2 border-gray-900": activeIndex === index,
              })}>
              {s.title}
            </span>
          </button>
        ))}
      </div>
      {element && (
        <StepWrapper download={download} goToNext={goToNext} goToPrev={goToPrev}>
          {element}
        </StepWrapper>
      )}
    </>
  );
};
