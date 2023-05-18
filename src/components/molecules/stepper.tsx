import React, { useEffect, useMemo, useState } from "react";
import { StepWrapper } from "./stepWrapper";
import { Button } from "../atoms/button";

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

export type Step = {
  title: string;
  id: string;
  element: React.ReactElement;
  onNext?: () => void;
};
export const Stepper: React.FC<{
  steps: Step[];
  download?: () => void;
}> = ({ steps, download }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [initialSize] = useState(steps.length);
  // This effect is called every time steps size is changed. 
  useEffect(() => {
    // We don't want to run it at the beginning.
    if (initialSize == steps.length || containerRef.current == null) {
      return;
    }
    const children = containerRef.current.children;
    for (let i = children.length - 1; i >= 0; i--) {
      if (children[i]?.classList.contains("progress-card")) {
        children[i]?.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
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
      const progress = 100 * (i + 1) / steps.length;
      if (i == 0) {
        results.push(<ProgressCard key="start" icon="👋" title="Let's create your resume!" subtitle="Complete the forms below to export your resume." />
        )
      } else if (i == 1) {
        results.push(<ProgressCard key="template-before" icon="🎨" title="Choose the design!" subtitle="We're sure you'll find a perfect one just for you." />,);
      }
      else if (i == 2) {
        results.push(<ProgressCard key="template-after" icon="😍" title="Great choice!" subtitle="Now personalize the list of sections." />,);
      }
      else if (i == 3) {
        results.push(<ProgressCard key="template-after" icon="✅" title="Sections configured." subtitle="Now edit their contents." />,);
      }
      else if (i == steps.length - 1) {
        results.push(<ProgressCard key="100%" icon="🎉" title="You're all set!" subtitle="Customize and export your resume below." />,);
      }
      else if (progress < 100 && encouragmentStack[encouragmentStack.length - 1] && encouragmentStack[encouragmentStack.length - 1]![0] <= progress) {
        results.push(encouragmentStack.pop()![1]);
      }

      results.push(<StepWrapper goToNext={step.onNext} id={step.id} key={step.id} download={download} goToNext={undefined} goToPrev={undefined} title={step.title}>
        {step.element}
      </StepWrapper>);

      if (i == steps.length - 1 && step.onNext) {
        results.push(
          <div className="flex justify-center">
            <Button className="text-base font-bold py-5 w-full md:max-w-[33%] bg-indigo-800" onClick={step.onNext}>Next step</Button>
          </div>
        )
      }
    }
    return results;
  }, [steps]);

  return (<div className="flex flex-col gap-10" ref={containerRef}>
    {elements}
  </div>)
};
