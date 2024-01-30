import React from "react";
import { useIsMounted } from "../../utils/ssr";

export const ClientOnly: React.FC<{children: React.ReactElement | null}> = ({children}) => {
    const mounted = useIsMounted();

    if (!mounted) {
        return null;
    }

    return children;
}

export const makeClientOnly = (component: React.FC<any>): React.FC<any> => (props) => (
    <ClientOnly>{React.createElement(component, props)}</ClientOnly>
)