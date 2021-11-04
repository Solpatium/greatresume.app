import { useLocalStorage, useSessionStorage, useThrottleFn } from "react-use";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { makeEmptyResume, ResumeModel, resumeStruct } from "../models/v1";
import { isServer } from "./ssr";
import useTranslation from "next-translate/useTranslation";
import { is } from "superstruct";

export type SessionType = "local" | "session";

// TODO: remove external hooks
const useStorageSelected = (): [undefined | SessionType, (type: SessionType) => void] => {
  const [localStorageSelected, setLocalStorageSelected] = useLocalStorage<boolean>(
    "local-storage-selected",
  );
  const [sessionStorageSelected, setSessionStorageSelected] = useSessionStorage<boolean>(
    "session-storage-selected",
  );
  const setStorage = useCallback(
    (type: SessionType) => {
      if (type === "local") {
        setLocalStorageSelected(true);
        setSessionStorageSelected(false);
      } else {
        setSessionStorageSelected(true);
        setLocalStorageSelected(false);
      }
    },
    [setLocalStorageSelected, setSessionStorageSelected],
  );

  return [
    (localStorageSelected && "local") || (sessionStorageSelected && "session") || undefined,
    setStorage,
  ];
};

export type SavedResume = ResumeModel & { lastUpdate: Date };

export const useResumeStorage = (): {
  getResume: () => SavedResume | undefined;
  saveResume: (resume: ResumeModel) => void;
} => {
  const { replace } = useRouter();
  const [type] = useStorageSelected();

  useEffect(() => {
    if (!type) {
      replace("/storage-settings");
    }
  }, [replace, type]);

  const getResume = useCallback(() => {
    if (isServer) {
      return undefined;
    }
    const storage = type === "local" ? localStorage : sessionStorage;
    const saved = storage.getItem("resume");
    if (!saved) {
      return undefined;
    }
    // TODO: validate and handle errors
    const parsed = JSON.parse(saved);
    const lastUpdate = new Date(parsed.lastUpdate);
    if (!is(parsed, resumeStruct)) {
      return undefined;
    }
    return { ...parsed, lastUpdate };
  }, [type]);

  const saveResume = useCallback(
    (resume: ResumeModel) => {
      const storage = type === "local" ? localStorage : sessionStorage;

      storage.setItem(
        "resume",
        JSON.stringify({ ...resume, lastUpdate: new Date().toISOString() }),
      );
    },
    [type],
  );

  return { getResume, saveResume };
};

export const useResumeData = (): [ResumeModel, Dispatch<SetStateAction<ResumeModel>>] => {
  const { t } = useTranslation("app");
  const { getResume, saveResume } = useResumeStorage();
  const [data, setData] = useState<ResumeModel>(() => {
    console.log(getResume());
    return (
      getResume() ??
      makeEmptyResume({
        paperSize: t("defaults.paperSize"),
        titles: {
          languages: t("defaults.titles.languages"),
          interests: t("defaults.titles.interests"),
          skills: t("defaults.titles.skills"),
          education: t("defaults.titles.education"),
          experience: t("defaults.titles.experience"),
        },
        legalClause: t("defaults.legal-clause"),
      })
    );
  });
  useThrottleFn(
    data => {
      saveResume(data);
    },
    5000,
    [data],
  );

  return [data, setData];
};
