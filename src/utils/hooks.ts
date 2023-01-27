import { MutableRefObject, useEffect } from "react";

export const useIsVisible = (ref: MutableRefObject<HTMLElement | null | undefined>, onChange: (visible: boolean) => void) => {
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    let previousVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const newValue = entry?.isIntersecting ?? false;
        if (previousVisible !== newValue) {
          previousVisible = newValue;
          onChange(newValue);
        }
        console.log({previousVisible, newValue})
      }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
}