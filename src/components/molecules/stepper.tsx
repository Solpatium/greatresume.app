import React, { useEffect, useMemo, useState } from "react";
import classes from "classnames";
import { StepWrapper } from "./stepWrapper";

const ProgressCard: React.FC<{ icon: string, title: string, subtitle: string }> = ({ icon, title, subtitle }) => {
  return (<div className="flex justify-center my-10 mx-2">
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
};
export const Stepper: React.FC<{
  steps: Step[];
  download?: () => void;
}> = ({ steps, download }) => {
  const elements = useMemo(() => {
    let results: React.ReactElement[] = [
      <ProgressCard key="start" icon="👋" title="Let's create your resume!" subtitle="Complete the forms below to export your resume." />,
    ];
    let encouragmentStack: [number, React.ReactElement][] = [
      [75, <ProgressCard key="75%" icon="⚡️" title="You're almost done!" subtitle="We're missing just a few details." />],
      [50, <ProgressCard key="50%" icon="💫" title="You are halfway through!" subtitle="The other half is the small one." />],
      [25, <ProgressCard key="25%" icon="🔥" title="You're doing great!" subtitle="Keep going." />],
    ];
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]!;
      const progress = 100 * (i + 1) / steps.length;
      results.push(<StepWrapper id={step.id} key={step.id} download={download} goToNext={undefined} goToPrev={undefined} title={step.title}>
        {step.element}
      </StepWrapper>);
      if (i == 0) {
        results.push(<ProgressCard key="template-before" icon="🎨" title="Choose the design!" subtitle="We're sure you'll find a perfect one just for you." />,);
      }
      else if (i == 1) {
        results.push(<ProgressCard key="template-after" icon="😍" title="Great choice!" subtitle="Now personalize the list of sections." />,);
      }
      else if (i == steps.length - 2) {
        results.push(<ProgressCard key="100%" icon="🎉" title="You're all set!" subtitle="Customize and export your resume below." />,);
      }
      else if (progress < 100 && encouragmentStack[encouragmentStack.length - 1] && encouragmentStack[encouragmentStack.length - 1]![0] <= progress) {
        results.push(encouragmentStack.pop()![1]);
      }
    }
    return results;
  }, [steps]);

  return (<>
    {elements}
  </>)
};
