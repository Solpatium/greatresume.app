import {useEffect, useState} from "react";

export const isServer = typeof window === "undefined";

export const isClient = !isServer;

export const useIsMounted = () => {
    const [mounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);
    return mounted
}