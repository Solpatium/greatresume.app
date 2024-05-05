import { useThrottleFn } from "react-use";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { makeEmptyResume, ResumeModel, resumeStruct } from "../models/v1";
import { isServer } from "./ssr";
import useTranslation from "next-translate/useTranslation";
import { is } from "superstruct";

export type SessionType = "local" | "session";

export type SavedResume = ResumeModel & { lastUpdate: Date };

export const useResumeStorage = (): {
  getResume: () => SavedResume | undefined;
  saveResume: (resume: ResumeModel) => void;
} => {
  const getResume = useCallback(() => {
    if (isServer) {
      return undefined;
    }
    const saved = localStorage.getItem("resume");
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
  }, []);

  const saveResume = useCallback(
    (resume: ResumeModel) => {
      localStorage.setItem(
        "resume",
        JSON.stringify({ ...resume, lastUpdate: new Date().toISOString() }),
      );
    },
    [],
  );

  return { getResume, saveResume };
};

export const useResumeData = (): [ResumeModel, Dispatch<SetStateAction<ResumeModel>>] => {
  const { t } = useTranslation("app");
  const { getResume, saveResume } = useResumeStorage();

  const [data, setData] = useState<ResumeModel>(() => {
    const existingResume = getResume();

    console.log(existingResume);

    if (existingResume) {
      return existingResume;
    }

    return makeEmptyResume({
      paperSize: t("defaults.paperSize"),
      texts: {
        experienceTitle: t("defaults.titles.experience"),
        educationTitle: t("defaults.titles.education"),
        legalClause: t("defaults.legal-clause"),
      },
    });
  });

  useThrottleFn(
    data => {
      saveResume(data);
    },
    2000,
    [data],
  );

  return [data, setData];
};
