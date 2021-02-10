import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { ResumeModel } from "../../models/v1";
import { StateSetter } from "../../utils/mutators";
import classes from "classnames";

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
  title: string;
  element: React.FC<{
    state: ResumeModel;
    setState: StateSetter<ResumeModel>;
    goToNext: () => void;
    goToPrev?: () => void;
  }>;
};

export const Stepper: React.FC<{
  initial?: number;
  state: ResumeModel;
  setState: StateSetter<ResumeModel>;
  steps: Step[];
}> = ({ initial, state, setState, steps }) => {
  const [active, setActive] = React.useState(initial ?? 0);
  const goToNext = useCallback(() => setActive(a => a + 1), []);
  const goToPrev = useCallback(() => setActive(a => Math.max(0, a - 1)), []);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    wrapperRef.current?.children?.item(active)?.scrollIntoView?.({ behavior: "smooth" });
  }, [active]);
  const Element = steps[active]?.element;
  return (
    <div>
      <HorizontalScrollWrapper ref={wrapperRef}>
        {steps.map((s, index) => (
          <span
            key={s.title}
            onClick={() => setActive(index)}
            className={classes(
              "cursor-pointer",
              "inline-block",
              "text-base",
              "font-fancy",
              "text-xl",
              "py-4 px-3",
              "m-0",
              {
                "ml-0": index === 0,
              },
            )}>
            <span
              className={classes("pb-1", {
                "border-b-solid border-b-2 border-blue-600": active === index,
                "text-blue-600": active === index,
                "text-gray-600": active !== index,
              })}>
              {s.title}
            </span>
          </span>
        ))}
      </HorizontalScrollWrapper>
      {Element && (
        <Element
          state={state}
          setState={setState}
          goToNext={active < steps.length ? goToNext : undefined}
          goToPrev={active > 0 ? goToPrev : undefined}
        />
      )}
    </div>
  );
};
