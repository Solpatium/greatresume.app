import React, { useEffect, useMemo, useState } from "react"
import { Button } from "../atoms/button";
import styles from "./stepper.module.scss";

const ProgressCard: React.FC<{ icon: string, title: string, subtitle: string }> = ({ icon, title, subtitle }) => {
  return (<div className="progress-card flex justify-center p-3 my-7">
    <div className="bg-white rounded-3xl p-4 md:p-5 flex gap-5 items-center">
      <span className="min-w-[4rem] w-16 h-16 md:w-20 md:h-20 text-3xl md:text-4xl flex justify-center items-center bg-slate-50 rounded-full grow" aria-hidden>{icon}</span>
      <div className="flex flex-col justify-center gap-1">
        <span className="text-lg md:text-xl font-semibold">{title}</span>
        <span className="text-md md:text-lg">{subtitle}</span>
      </div>
    </div>
  </div>)
};

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


const scrollToStep = (index: number) => {
  const step = document.getElementById(`step-${index}`);
  step?.focus({ preventScroll: true });
  setTimeout(() => {
    step?.scrollIntoView({ behavior: "smooth" });
  }, 100);
}

export type Step = {
  id: string;
  element: React.ReactElement;
  onNext?: () => void;
};
export const Stepper: React.FC<{
  steps: Step[];
  maxSteps: number;
  download?: () => void;
}> = ({ steps, download, maxSteps }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [initialSize] = useState(steps.length);
  // This effect is called every time steps size is changed. 
  useEffect(() => {
    // We don't want to run it at the beginning.
    if (initialSize == steps.length || containerRef.current == null) {
      return;
    }
    scrollToStep(steps.length - 1);
  }, [initialSize, steps.length]);

  const elements = useMemo(() => {
    let results: React.ReactElement[] = [];
    let encouragmentStack: [number, React.ReactElement][] = [
      [75, <ProgressCard key="75%" icon="⚡️" title="You're almost done!" subtitle="We're missing just a few details." />],
      [50, <ProgressCard key="50%" icon="💫" title="You are halfway through!" subtitle="The other half is the small one." />],
      // TODO: Fill value
      [25, <ProgressCard key="25%" icon="🔥" title="Only X steps left." subtitle="You're doing great!" />],
    ];
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]!;
      const progress = 100 * (i + 1) / maxSteps;
      let progressCard = null;
      if (i == 0) {
        progressCard = <ProgressCard key="start" icon="👋" title="Let's create your resume!" subtitle="Complete the forms below to export your resume." />;
      } else if (i == 1) {
        progressCard = <ProgressCard key="template-before" icon="🎨" title="Choose the design!" subtitle="We're sure you'll find a perfect one just for you." />;
      }
      else if (i == 2) {
        progressCard = <ProgressCard key="template-after" icon="😍" title="Great choice!" subtitle="Now personalize the list of sections." />;
      }
      else if (i == 3) {
        progressCard = <ProgressCard key="template-after" icon="✅" title="Sections configured." subtitle="Now edit their contents." />;
      }
      else if (i == maxSteps - 1) {
        progressCard = <ProgressCard key="100%" icon="🎉" title="You're all set!" subtitle="Customize and export your resume below." />;
      }
      else if (progress < 100 && encouragmentStack[encouragmentStack.length - 1] && encouragmentStack[encouragmentStack.length - 1]![0] <= progress) {
        // Ignore encouragment for smaller progress if a better one is present.
        while (encouragmentStack.length > 0 && encouragmentStack[encouragmentStack.length - 1]![0] <= progress) {
          progressCard = encouragmentStack.pop()![1];
        }
      }

      let button = null;
      if (i == steps.length - 1 && step.onNext) {
        button = <div className="flex justify-center mt-10 mb-20 z-1 relative">
          <Button type="submit" className="text-base font-bold py-5 w-full md:max-w-[33%] bg-indigo-800" onClick={step.onNext}>Next step</Button>
        </div>;
      } else if (i == maxSteps - 1) {
        button = <div className="flex justify-center mt-10 mb-20">
          <Button type="submit" className="text-base font-bold py-5 w-full md:max-w-[50%] bg-indigo-500" onClick={download}>Download your resume</Button>
        </div>;
      } else {
        button = <button type="submit" className="hidden" />;
      }

      // TODO: Accessibility
      results.push(
        <form className="focus:outline-0" aria-label={step.title} tabIndex={-1} role="region" id={`step-${i}`} onSubmit={(e) => {
            e.preventDefault();
            // This works only when next field is already present.
            scrollToStep(i + 1);
          }} >
          {/*Add animation only to new steps*/}
          <div className={i >= initialSize ? styles.slideIn : ""}>
            {progressCard}
            <StepWrapper id={step.id} key={step.id}>
              {step.element}
            </StepWrapper>
            {button}
          </div>
        </form>
      )
    }
    return results;
  }, [steps]);

  return (<div className="flex flex-col gap-10" ref={containerRef}>
    {elements}
  </div>)
};
