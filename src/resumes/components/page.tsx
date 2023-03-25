import React from "react";
import { useContext } from "react";
import { styleContext } from "../stylesheet";
import { Page } from "@react-pdf/renderer";



export const StyledPage: React.FC<{
    children: React.ReactElement | React.ReactElement[],
    size: "A4" | "LETTER"
}> = ({ children, size }) => {
    const stylesheet = useContext(styleContext);

    return <Page style={stylesheet("page")} size={size}>{children}</Page>;
}