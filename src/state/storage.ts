import { SessionType, useStorageSelected } from "../utils/storage";
import { useCallback, useEffect, useMemo } from "react";
import { ApplicationState } from "./types";
import { useRouter } from "next/router";
import { useThrottleFn } from "react-use";
import { subscribe } from "valtio";
import { applicationStateStruct, resumeStruct } from "../models/v1";
import { assert, is } from "superstruct";

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
  remove: () => void;
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
      localStorage.setItem(lastUpdateKey, new Date().toISOString());
    },
    remove: () => storage.removeItem(key),
  }), [storage]);
};

export const useAppStateStorage = (): {
  get: () => ApplicationState | undefined;
  set: (data: Record<any, any>) => void;
  remove: () => void;
} => {
  const [storageSelected] = useStorageSelected();
  const {replace} = useRouter();
  
  useEffect(() => {
    if (!storageSelected) {
      replace("/storage-settings");
    }
  }, [storageSelected]);

  const storage = useStorage("app state", storageSelected ?? "session") as any;

  const set = useCallback((data: Record<any, any>) => {
    assert(data, applicationStateStruct);
    storage.set(data);
  }, [storage.set]);

  const get = useCallback((): ApplicationState | undefined => {
    const data = storage.get();
    
    if (!data) {
      return undefined;
    }

    if (is(data, applicationStateStruct)) {
      return data;
    }

    console.warn("Data found, but it was not complient with the schema.", data);
    return undefined
  }, [storage.get])

  const {remove} = storage;

  return useMemo(() => ({get, set, remove}), [get, set, remove]);
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

