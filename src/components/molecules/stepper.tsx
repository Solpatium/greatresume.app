import React, { useEffect, useMemo, useState } from "react"
import { Button } from "../atoms/button";
import styles from "./stepper.module.scss";
import { useSnapshot } from "valtio";
import { useAppState } from "../../state/store";
import useTranslation from "next-translate/useTranslation";
import { ArrowDownOnSquareIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

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

export const DownloadButton = () => {
  const {t} = useTranslation("app");
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
  maxSteps: number;
}> = ({ steps, maxSteps }) => {
  const { t } = useTranslation("app");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [initialSize] = useState(steps.length);

  const elements = useMemo(() => {
    let results: React.ReactElement[] = [];
    let encouragmentStack: [number, { icon: string, title: string, subtitle: string }][] = [
      [75, { icon: "⚡️", title: "progress.75%.title", subtitle: "progress.75%.subtitle" }],
      [50, { icon: "💫", title: "progress.50%.title", subtitle: "progress.50%.subtitle" }],
      [25, { icon: "🔥", title: "progress.25%.title", subtitle: "progress.25%.subtitle" }],
    ];
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]!;
      const progress = 100 * (i + 1) / maxSteps;
      let progressCard = null;
      if (i == 0) {
        progressCard = <ProgressCard key="start" icon="👋" title={t`progress.start.title`} subtitle={t`progress.start.subtitle`} />;
      } else if (i == 1) {
        progressCard = <ProgressCard key="before-template" icon="🎨" title={t`progress.before-template.title`} subtitle={t`progress.before-template.subtitle`} />;
      }
      else if (i == 2) {
        progressCard = <ProgressCard key="after-template" icon="😍" title={t`progress.after-template.title`} subtitle={t`progress.after-template.subtitle`} />;
      }
      else if (i == 3) {
        progressCard = <ProgressCard key="after-sections" icon="✅" title={t`progress.after-sections.title`} subtitle={t`progress.after-sections.subtitle`} />;
      }
      else if (i == maxSteps - 1) {
        progressCard = <ProgressCard key="100%" icon="🎉" title={t`progress.100%.title`} subtitle={t`progress.100%.subtitle`} />;
      }
      else if (progress < 100 && encouragmentStack[encouragmentStack.length - 1] && encouragmentStack[encouragmentStack.length - 1]![0] <= progress) {
        // Ignore encouragment for smaller progress if a better one is present.
        while (encouragmentStack.length > 0 && encouragmentStack[encouragmentStack.length - 1]![0] <= progress) {
          const { icon, title, subtitle } = encouragmentStack.pop()![1];
          progressCard = <ProgressCard key={title} icon={icon} title={t(title, {stepsLeft: maxSteps-i-1})} subtitle={t(subtitle)} />
        }
      }

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
          <div className={i >= initialSize ? styles.slideIn : ""}>
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
