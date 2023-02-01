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
        console.log({ previousVisible, newValue })
      }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
}

export const useResize = (action: () => void) => {
  useEffect(() => {
    let handle: ReturnType<typeof setTimeout> | undefined;
    let width = window.innerWidth;
    const handler = () => {
      if (handle) {
        clearTimeout(handle);
      }
      if (window.innerWidth != width) {
        handle = setTimeout(() => {
          action(); 
          width = window.innerWidth;
        }, 100);
      }
    }
    addEventListener("resize", handler);
    return () => removeEventListener("resize", handler);
  }, [])
}