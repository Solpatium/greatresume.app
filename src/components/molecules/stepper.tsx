import React, { useMemo } from "react"
import { Button } from "../atoms/button";
import { useSnapshot } from "valtio";
import { useAppState } from "../../state/store";
import useTranslation from "next-translate/useTranslation";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";


export const StepWrapper: React.FC<{
  className?: string;
  id: string;
  children: React.ReactElement | React.ReactElement[];
}> = ({ className, children, id }) => {
  return (
    <div
      id={id}
      className={`${className} md:shadow-xl bg-white px-3 md:px-5 py-5 pb-8 md:border-solid md:border md:border-gray-200 rounded-none md:rounded-xl`}>
      {children}
    </div>
  );
};

export const DownloadButton = () => {
  const { t } = useTranslation("app");
  const download = useSnapshot(useAppState().rendered).download;
  if (!download) {
    return null;
  }

  return (<Button type="submit" icon={ArrowDownTrayIcon} largeIcon className="mx-2 sm:py-5 w-full md:max-w-[50%] min-h-[70px]" onClick={download}>
    <span className="text-base font-extrabold">{t`downloadYourResume`}</span>
  </Button>);
}

const scrollToStep = (index: number) => {
  const step = document.getElementById(`step-${index}`);
  step?.focus({ preventScroll: true });
  setTimeout(() => {
    step?.scrollIntoView({ behavior: "smooth" });
  }, 100);
}

export type Step = {
  id: string;
  title: string;
  element: React.ReactElement;
  onNext?: () => void;
};

export const Stepper: React.FC<{
  steps: Step[];
}> = ({ steps }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const elements = useMemo(() => {
    let results: React.ReactElement[] = [];

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]!;


      let button = null;
      if (i == steps.length - 1) {
        button = <div className="flex justify-center mt-10 mb-20 z-1 relative"><DownloadButton /></div>;
      } else {
        button = <button type="submit" className="hidden" />;
      }

      // TODO: Accessibility
      // Fix aria label title
      results.push(
        <form
          key={step.id}
          className="focus:outline-0" aria-label={step.title} tabIndex={-1} role="region" id={`step-${i}`} onSubmit={(e) => {
            e.preventDefault();
            // This works only when next field is already present.
            scrollToStep(i + 1);
          }} >
          {/*Add animation only to new steps*/}
          <StepWrapper id={step.id} key={step.id}>
            {step.element}
          </StepWrapper>
          {button}
        </form>
      )
    }
    return results;
  }, [steps]);

  return (<div className="flex flex-col gap-10" ref={containerRef}>
    {elements}
  </div>)
};
