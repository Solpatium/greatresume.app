import React from "react";
import { useContext } from "react";
import { styleContext } from "../stylesheet";
import { Page } from "@react-pdf/renderer";
import { V } from "./view";



export const StyledPage: React.FC<{
    children: React.ReactElement | React.ReactElement[],
    size: "A4" | "LETTER"
}> = ({ children, size }) => {
    const stylesheet = useContext(styleContext);

    return <Page style={stylesheet("page")} size={size}><V className="pageInside">{children}</V></Page>;
}