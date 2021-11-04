import { MutableRefObject, useRef } from "react";

export const useRefValue = <T>(state: T): MutableRefObject<T> => {
  const ref = useRef(state);
  ref.current = state;
  return ref;
};
