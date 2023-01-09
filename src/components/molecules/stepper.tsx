import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { ResumeModel } from "../../models/v1";
import { StateSetter } from "../../utils/mutators";
import classes from "classnames";
import { useDrag } from "@use-gesture/react";
import { StepWrapper } from "./stepWrapper";

const HorizontalScrollWrapper = styled.div`
  width: 100%;
  overflow: auto;
  text-align: left;
  white-space: nowrap;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media print {
    display: none;
  }
`;

export type Step = {
  title: string;
  element: React.ReactElement;
};

const V_THRESHOLD = 0.3;

export const Stepper: React.FC<{
  steps: Step[];
}> = ({ steps }) => {
  const [activeIndex, setIndex] = useState(0);
  const lastIndex = steps.length;
  const prevIndex: number | null = activeIndex > 0 ? activeIndex - 1 : null;
  const nextIndex: number | null = activeIndex < lastIndex ? activeIndex + 1 : null;
  // TODO: prevIndex must be either a function or null
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

  const containerRef = useRef<HTMLDivElement>();
  const bind = useDrag(
    ({ event, last, movement: [x] }) => {
      if (!last) {
        return;
      }

      const target = event.target as HTMLElement;
      const isClickable = ["input", "textarea", "button"].includes(target.tagName.toLowerCase());
      const isInModal = target.closest("#headlessui-portal-root");
      console.log(target);
      if (!isClickable && !isInModal) {
        if (x > 0) {
          // goToPrev?.();
        } else {
          // goToNext?.();
        }
      }
    },
    {
      axis: "x",
      threshold: 50,
    },
  );
  const element = steps[activeIndex]?.element;

  // TODO accessibility
  return (
    <div ref={containerRef}>
      <HorizontalScrollWrapper>
        {steps.map((s, index) => (
          <button
            key={index}
            type="button"
            ref={index === activeIndex ? setActiveElement : undefined}
            onClick={() => setIndex(index)}
            className={classes(
              "cursor-pointer",
              "inline-block",
              "text-base",
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
      </HorizontalScrollWrapper>
      {element && (
        // <div {...bind()}>
        <div {...bind()}>
          <StepWrapper goToNext={goToNext} goToPrev={goToPrev}>
            {element}
          </StepWrapper>
        </div>
      )}
    </div>
  );
};
