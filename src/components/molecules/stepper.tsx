import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ResumeModel } from "../../models/v1";
import { StateSetter } from "../../utils/mutators";
import classes from "classnames";
import { useDrag } from "react-use-gesture";
import Link from "next/link";

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

type Step = {
  path: string;
  title: string;
  element: React.FC<{
    state: ResumeModel;
    setState: StateSetter<ResumeModel>;
    goToNext: () => void;
    goToPrev?: () => void;
  }>;
};

const V_THRESHOLD = 0.4;

export const Stepper: React.FC<{
  state: ResumeModel;
  setState: StateSetter<ResumeModel>;
  selected?: string;
  goTo: (path: string) => void;
  steps: Step[];
}> = ({ state, setState, selected, goTo, steps }) => {
  const [activeElement, setActiveElement] = useState<HTMLAnchorElement | null>(null);

  useEffect(() => {
    window.scroll(0, 0);
    activeElement?.scrollIntoView?.({ behavior: "smooth", inline: "center" });
  }, [activeElement]);

  const activeIndex = steps.findIndex(s => s.path === selected) ?? 0;
  const [goToPrev, goToNext] = useMemo(() => {
    const prev = steps[activeIndex - 1]?.path;
    const next = steps[activeIndex + 1]?.path;
    return [prev && (() => goTo(prev)), next && (() => goTo(next))];
  }, [activeIndex, goTo, steps]);
  const bind = useDrag(({ event, last, vxvy: [vx, vy], ...rest }) => {
    if (last || (Math.abs(vx) < Math.abs(vy) && event.target?.tagName.toLowerCase() === "div")) {
      if (vx < -V_THRESHOLD) {
        goToNext?.();
      } else if (vx > V_THRESHOLD) {
        goToPrev?.();
      }
    }
  });
  const Element = steps[activeIndex]?.element;
  return (
    <div>
      <HorizontalScrollWrapper>
        {steps.map((s, index) => (
          <Link
            key={s.path}
            href={s.path}
            ref={index === activeIndex ? setActiveElement : undefined}
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
          </Link>
        ))}
      </HorizontalScrollWrapper>
      {Element && (
        <div {...bind()}>
          <Element state={state} setState={setState} goToNext={goToNext} goToPrev={goToPrev} />
        </div>
      )}
    </div>
  );
};
