import React from "react";
import { useContext } from "react";
import { styleContext } from "../stylesheet";
import { Page } from "@react-pdf/renderer";
import { V } from "./view";



export const StyledPage: React.FC<{
    background?: React.ReactElement;
    children: React.ReactElement | React.ReactElement[],
    size: "A4" | "LETTER"
}> = ({ children, background, size }) => {
    const stylesheet = useContext(styleContext);

    return <Page style={stylesheet("page")} size={size}>
        {background ?? null}
        <V className="pageInside">{children}</V>
    </Page>;
}