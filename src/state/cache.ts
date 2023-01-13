import { useCallback, useEffect, useRef, useState } from "react";
import { proxy, subscribe } from "valtio";
import { ApplicationState, ApplicationCache } from "./types";

export const useCreateCache = (stateProxy: ApplicationState): ApplicationCache => {
    const [cache] = useState<ApplicationCache>(() => proxy({}));
    // const lastImage = useRef<string | undefined>(undefined);

    // const setUrl = useCallback((url: string | undefined) => {
    //     if (cache.dataUrlImage) {
    //         URL.revokeObjectURL(cache.dataUrlImage);
    //     }
    //     cache.dataUrlImage = url;
    // }, [cache]);

    // useEffect(() => {
    //     const handler = () => {
    //         const img = stateProxy.resume.appearance.image;
    //         if (img === lastImage.current) {
    //             return;
    //         }
    //         lastImage.current = img;
    //         if (img === undefined) {
    //             setUrl(undefined);
    //             return;
    //         }

    //         base64ToDataUrl(img).then(setUrl).catch(console.error);
    //     };

    //     // Fire handler at the beginning
    //     handler();

    //     return subscribe(stateProxy.resume.appearance, handler);
    // })
    return cache;
}