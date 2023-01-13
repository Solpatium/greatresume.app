import { SessionType, useStorageSelected } from "../utils/storage";
import { useEffect, useMemo } from "react";
import { ApplicationState } from "./types";
import { useRouter } from "next/router";
import { useThrottleFn } from "react-use";
import { subscribe } from "valtio";

const lastUpdateKey = "last-update";
export const useGetLastUpdate = (): string => {
  return useMemo(() => {
    const lastUpdate = localStorage.getItem(lastUpdateKey);
    if (!lastUpdate) {
      return "";
    }
    return new Date(lastUpdate).toLocaleString();
  }, []);
};

const useStorage = (key: string, sessionType: SessionType): {
  get: () => Record<string, unknown> | undefined;
  set: (data: Record<string, unknown>) => void;
} => {
  const storage = sessionType === 'local' ? localStorage : sessionStorage;
  return useMemo(() => ({
    get: () => {
      const stored = storage.getItem(key);
      if (!stored) {
        return undefined;
      }
      return JSON.parse(stored);
    },
    set: (data) => {
      storage.setItem(key, JSON.stringify(data));
    }
  }), [storage]);
};

// TODO: validation
export const useAppStateStorage = (): {
  get: () => ApplicationState | undefined;
  set: (data: ApplicationState) => void;
} => {
  const [storageSelected] = useStorageSelected();
  const {replace} = useRouter();
  
  useEffect(() => {
    if (!storageSelected) {
      replace("/storage-settings");
    }
  }, [storageSelected]);

  return useStorage("app state", storageSelected ?? "session") as any;
};

const savePeriod = 2000;
export const useThrottledAppPersistance = (stateProxy: ApplicationState): void => {
  const storage = useAppStateStorage();

  useEffect(() => {
    let timeoutHandle: undefined | ReturnType<typeof setTimeout>;
    let lastRun = 0;
    const unsubscribe = subscribe(stateProxy, () => {
      // This is not the default debounce behaviour. We only clear timeout
      // if enough time has passed. Otherwise we want the scheduled event to happen.
      if (timeoutHandle && Date.now() - lastRun < savePeriod ) {
        clearTimeout(timeoutHandle)
        timeoutHandle = undefined;
      }

      timeoutHandle = setTimeout(() => {
        lastRun = Date.now();
        storage.set(stateProxy);
      }, savePeriod);
    })

    return  () => {
      unsubscribe();
      if (timeoutHandle){
        clearTimeout(timeoutHandle);
      }
    }
  }, []);
};

