import { useCallback, useEffect, useMemo } from "react";
import { subscribe } from "valtio";
import { ApplicationPersistentState, applicationStateStruct } from "../models/v1";
import { assert, is } from "superstruct";
import useTranslation from "next-translate/useTranslation";

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

const useStorage = (key: string): {
  get: () => Record<string, unknown> | undefined;
  set: (data: Record<string, unknown>) => void;
  remove: () => void;
} => {
  return useMemo(() => ({
    get: () => {
      const stored = localStorage.getItem(key);
      if (!stored) {
        return undefined;
      }
      return JSON.parse(stored);
    },
    set: (data) => {
      localStorage.setItem(key, JSON.stringify(data));
      localStorage.setItem(lastUpdateKey, new Date().toISOString());
    },
    remove: () => localStorage.removeItem(key),
  }), []);
};

const appStateKey = "app state";

export const useDataPurgePermission = () => {
  const localStorage = useStorage(appStateKey);
  const { t } = useTranslation("common");
  return useCallback(() => {
    const hasResume = localStorage.get();
    return !hasResume || confirm(t`overwriteQuestion`);
  }, [sessionStorage.get, localStorage.get]);
}

export const useImportState = () => {
  const storage = useStorage(appStateKey);
  const canPurge = useDataPurgePermission();

  return useCallback((state: ApplicationPersistentState): boolean => {
    if(!canPurge()) {
      return false;
    }

    storage.set(state);
    return true;
  }, [canPurge]);
}

export const useAppStateStorage = (): {
  get: () => ApplicationPersistentState | undefined;
  set: (data: Record<any, any>) => void;
  remove: () => void;
} => {
  const storage = useStorage(appStateKey);

  const set = useCallback((data: Record<any, any>) => {
    assert(data, applicationStateStruct);
    storage.set(data);
  }, [storage.set]);

  const get = useCallback((): ApplicationPersistentState | undefined => {
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
export const useThrottledAppPersistance = (stateProxy: ApplicationPersistentState): void => {
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

