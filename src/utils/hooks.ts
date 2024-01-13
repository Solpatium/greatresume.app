import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMedia } from "react-use";

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

export const useRerender = (): (() => void) => {
  const [, setState] = useState<any>();
  return useCallback(() => {
    setState({});
  }, []);
}

export const useIsMobile = () => {
  return useMedia('(max-width: 480px)');
}

export const useIsLarge = () => {
  return useMedia('(min-width: 1024px)');
}



declare global {
  interface Window { fakeHistory?: string[]; }
}

// Key must be unique among different active usages of this hook.
export const useHistoryPush = (key: string, onBack: () => void): { push: () => void, maybePop: () => void } => {

  const currentOnBack = useRef(onBack);
  currentOnBack.current = onBack;
  useEffect(() => {
    const handler = () => {
      window.fakeHistory = window.fakeHistory ?? [];
      if (window.fakeHistory[window.fakeHistory.length - 1] === key) {
        window.fakeHistory.pop();
        currentOnBack.current();
      }
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);
  return useMemo(() => {return{
    push: () => {
      // Nextjs overwrites push, it is not possible to pass any data :/.
      // That's why fakeHistory is used to bypass that.
      history.pushState("", "");
      window.fakeHistory = window.fakeHistory ?? [];
      window.fakeHistory.push(key);
    },
    maybePop: () => {
      window.fakeHistory = window.fakeHistory ?? [];
      // Remove history entry to make sure onBack is not triggered.
      console.log(window.fakeHistory);
      if (window.fakeHistory[window.fakeHistory.length - 1] === key) {
        window.fakeHistory.pop();
      }
    }
  };}, [key]);
}