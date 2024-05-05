import React from "react";
import cn from "classnames";
import { useMountedState, useToggle } from "react-use";
import { makePromise } from "../../utils/promise";

export const Form: React.FC<{ className?: string; onSubmit: () => void | Promise<any> }> = ({
  className,
  children,
  onSubmit,
}) => {
  const isMounted = useMountedState();
  const [submitting, toggleSubmitting] = useToggle(false);
  return (
    <form
      onSubmit={e => {
        if (submitting) {
          return;
        }
        e.preventDefault();
        toggleSubmitting();
        makePromise(onSubmit()).finally(() => {
          if (isMounted()) {
            toggleSubmitting();
          }
        });
      }}
      className={cn(className, submitting && "opacity-30 pointer-events-none")}>
      {children}
    </form>
  );
};
