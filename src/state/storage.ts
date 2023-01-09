import { createJSONStorage } from "zustand/middleware";
import { SessionType } from "../utils/storage";
import { PersistStorage } from "zustand/middleware/persist";
import { useMemo } from "react";

const lastUpdateKey = "last-update";
export const useGetLastUpdate = (): string => {
  return useMemo(() => {
    const lastUpdate = localStorage.getItem(lastUpdateKey);
    if (!lastUpdate) {
      return "";
    }
    return new Date(localStorage.getItem(lastUpdateKey)).toLocaleString();
  }, []);
};

export const createStorage = (type: SessionType): PersistStorage<Record<string, any>> => {
  const innerStorage = createJSONStorage(() => (type === "local" ? localStorage : sessionStorage));
  let valueToPersist = null;
  let timeoutHandle = null;
  return {
    getItem: name => innerStorage.getItem(name),
    removeItem: innerStorage.removeItem,
    // Saves data once every 2 seconds and saves lastUpdate value
    setItem: (name, value) => {
      valueToPersist = value;
      if (timeoutHandle === null) {
        timeoutHandle = setTimeout(() => {
          innerStorage.setItem(name, valueToPersist);
          localStorage.setItem(lastUpdateKey, new Date().toISOString());
          timeoutHandle = null;
        }, 2000);
      }
    },
  };
};
