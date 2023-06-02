import { SessionType, useStorageSelected } from "../utils/storage";
import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useThrottleFn } from "react-use";
import { subscribe } from "valtio";
import { ApplicationPersistentState, applicationStateStruct, resumeStruct } from "../models/v1";
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

const appStateKey = "app state";

export const useDataPurgePermission = () => {
  const sessionStorage = useStorage(appStateKey, "session");
  const localStorage = useStorage(appStateKey, "local");
  const { t } = useTranslation("common");
  return useCallback(() => {
    const hasResume = sessionStorage.get() || localStorage.get();
    return !hasResume || confirm(t`overwriteQuestion`);
  }, [sessionStorage.get, localStorage.get]);
}

export const useImportState = () => {
  const sessionStorage = useStorage(appStateKey, "session");
  const localStorage = useStorage(appStateKey, "local");
  const canPurge = useDataPurgePermission();
  const [storageType, setStorageType] = useStorageSelected();

  return useCallback((state: ApplicationPersistentState) => {
    if(!canPurge()) {
      return;
    }

    // Default to session storage
    if(!storageType) {
      sessionStorage.set(state);
      setStorageType("session");
      return;
    }

    const storage = storageType === "local" ? localStorage : sessionStorage;
    storage.set(state);
  }, [canPurge]);
}

export const useStorageMigration = () => {
  // If user selects a different storage mechanism we need to migrate exiting state to a new storage
  const sessionStorage = useStorage(appStateKey, "session");
  const localStorage = useStorage(appStateKey, "local");

  const [previousStorage] = useStorageSelected();

  return useCallback((newStorageType: SessionType) => {
    if (previousStorage === newStorageType) {
      return;
    }
    const [source, target] = newStorageType === "local" ? [sessionStorage, localStorage] : [localStorage, sessionStorage];    
    const data = source.get();


    if (!data) {
      return;
    }

    // Set data before deleting old
    target.set(data);
    source.remove();
  }, []);
}

export const useAppStateStorage = (): {
  get: () => ApplicationPersistentState | undefined;
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

  const storage = useStorage(appStateKey, storageSelected ?? "session");

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

