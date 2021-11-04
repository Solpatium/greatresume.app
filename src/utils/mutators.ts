import { useCallback, useMemo } from "react";

export type Transformation<Type> = (value: Type) => Type;
export type StateSetter<Type> = (value: Type | Transformation<Type>) => void;
export type SimpleStateSetter<Type> = (value: Type) => void;

// export const useCallbackFactory = (fn: any, dependencies: any[]) => {
//     return useCallback((...args) => {

//     } , dependencies);
// }

// TODO
export const useNestObjectState = <Type extends Record<string, any>>(
  parentSetter: StateSetter<Type>,
) => {
  return useMemo(() => {
    const cache: any = {};
    return <Key extends keyof Type>(key: Key): StateSetter<Type[Key]> => {
      if (cache[key]) {
        return cache[key];
      }
      const setter = (transformation: Type[Key] | Transformation<Type[Key]>) =>
        parentSetter(value => ({
          ...value,
          [key]:
            typeof transformation === "function"
              ? (transformation as any)(value[key] as any)
              : transformation,
        }));
      cache[key] = setter;
      return setter;
    };
  }, [parentSetter]);
};

export const useNestArrayState = <Type extends Record<string, any>>(
  parentSetter: StateSetter<Type[]>,
) => {
  return useMemo(() => {
    const cache: any = {};
    return (index: number): StateSetter<Type> => {
      if (cache[index]) {
        return cache[index];
      }
      console.log("INDEX", index);
      const setter = (transformation: Type | Transformation<Type>) =>
        parentSetter(values => {
          const copy = [...values];
          console.log("VALUES", values, values[index]);
          copy[index] =
            typeof transformation === "function"
              ? (transformation as any)(values[index] as any)
              : transformation;
          return copy;
        });
      cache[index] = setter;
      return setter;
    };
  }, [parentSetter]);
};
