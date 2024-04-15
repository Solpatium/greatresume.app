import React, { useContext, createContext, useState, useMemo } from "react";
import { ApplicationPersistentState, makeEmptyResume } from "../models/v1";
import useTranslation from "next-translate/useTranslation";
import { proxy } from "valtio";
import { useAppStateStorage, useThrottledAppPersistance } from "./storage";

export interface RenderingState {
  pdfCreationInProgress: boolean;
  renderingInProgress: boolean;
}

export interface RenderedPdf {
  file: Blob | null;
  download: (() => Promise<void>) | null;
}

export interface PreviewState {
  previewVisible: boolean;
}

export interface AppState {
  renderingState: RenderingState;
  previewState: PreviewState,
  rendered: RenderedPdf;
  downloadInfo: {
    downloaded: boolean;
  };
}

const StoreContext = createContext(null as unknown as { state: ApplicationPersistentState, appState: AppState });

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
    return proxy({ resume, progress: {sectionsFilled: 0} });
  });

  const [appState] = useState(() => proxy({
    renderingState: {
      pdfCreationInProgress: false,
      renderingInProgress: false,
    },
    previewState: {
      previewVisible: false,
    },
    rendered: {
      file: null,
      download: null,
    },
    downloadInfo: {
      downloaded: false,
    },
  } as AppState));

  useThrottledAppPersistance(state);

  // Stable object reference
  const value = useMemo(() => ({ state, appState }), [state, appState]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const usePersistentState = (): ApplicationPersistentState => {
  return useContext(StoreContext).state;
};

export const useAppState = (): AppState => {
  return useContext(StoreContext).appState;
};
