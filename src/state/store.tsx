import React, { useContext, createContext, useState, useMemo } from "react";
import { ApplicationState, makeEmptyResume } from "../models/v1";
import useTranslation from "next-translate/useTranslation";
import { proxy } from "valtio";
import { ApplicationCache } from "./types";
import { useAppStateStorage, useThrottledAppPersistance } from "./storage";

const StoreContext = createContext(null as unknown as { state: ApplicationState, cache: ApplicationCache });

export const AppStateProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { t } = useTranslation("app");
  const storage = useAppStateStorage();

  const [state] = useState(() => {
    const saved = storage.get();
    if (saved) {
      return proxy(saved);
    }

    const resume = makeEmptyResume({
      paperSize: t("defaults.paperSize"),
      texts: {
        experienceTitle: t("defaults.titles.experience"),
        educationTitle: t("defaults.titles.education"),
        legalClause: t("defaults.legal-clause"),
      },
    });
    return proxy({ resume });
  });

  // TODO
  const cache = {};

  useThrottledAppPersistance(state);

  // Stable object reference
  const value = useMemo(() => ({ state, cache }), [state, cache]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useAppState = (): ApplicationState => {
  return useContext(StoreContext).state;
};

export const useAppCache = (): ApplicationCache => {
  return useContext(StoreContext).cache;
};
