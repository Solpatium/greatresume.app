import React, { useContext, createContext, useState } from "react";
import { makeEmptyResume } from "../models/v1";
import useTranslation from "next-translate/useTranslation";
import { proxy } from "valtio";
import { ApplicationState } from "./types";
import { useAppStateStorage, useThrottledAppPersistance } from "./storage";

const StoreContext = createContext(null as unknown as ApplicationState);

export const AppStateProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { t } = useTranslation("app");
  const storage = useAppStateStorage();

  const [state] = useState(() => {
    const saved =  storage.get();
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

  useThrottledAppPersistance(state);

  return <StoreContext.Provider value={state}>{children}</StoreContext.Provider>;
};

export const useAppState = (): ApplicationState => {
  return useContext(StoreContext);
};
