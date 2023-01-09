import React, { useContext, createContext, useMemo, useState } from "react";
import { makeEmptyResume, ResumeModel } from "../models/v1";
import { useStorageSelected } from "../utils/storage";
import useTranslation from "next-translate/useTranslation";
import { Signal, useSignal } from "@preact/signals-react";
import { proxy, useSnapshot } from "valtio";
import { INTERNAL_Snapshot } from "valtio/vanilla";

export interface ApplicationState {
  resume: ResumeModel;
  // setResume is called with immer instance, can be safely mutated
  // setResume: (update: (resume: ResumeModel) => void) => void;
}

const StoreContext = createContext(null as unknown as ApplicationState);

// export const StoreProvider: React.FC<{
//   children?: React.ReactNode;
// }> = ({ children }) => {
//   const [type] = useStorageSelected();
//   const { t } = useTranslation("app");
//
//   const [store] = useState(() => {
//     const initial = makeEmptyResume({
//       paperSize: t("defaults.paperSize"),
//       texts: {
//         experienceTitle: t("defaults.titles.experience"),
//         educationTitle: t("defaults.titles.education"),
//         legalClause: t("defaults.legal-clause"),
//       },
//     });
//
//     return create<ApplicationState>()(
//       devtools(
//         persist(
//           immer(set => ({
//             resume: initial,
//             setResume: update =>
//               set(s => {
//                 update(s.resume);
//               }),
//           })),
//           {
//             name: "resume",
//             storage: createStorage(type) as any,
//           },
//         ),
//       ),
//     );
//   });
//
//   return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
// };

export const AppStateProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [type] = useStorageSelected();
  const { t } = useTranslation("app");

  const [state] = useState(() => {
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

  return <StoreContext.Provider value={state}>{children}</StoreContext.Provider>;
};

export const useAppState = (): ApplicationState => {
  return useContext(StoreContext);
};
