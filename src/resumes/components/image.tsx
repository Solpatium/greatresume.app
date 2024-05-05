import React from "react";
import { useContext } from "react";
import { styleContext } from "../stylesheet";
import { Image } from "@react-pdf/renderer";

import cn from "classnames";



export const Img: React.FC<{ image?: string | null, className?: string }> = ({ image, className }) => {
    const stylesheet = useContext(styleContext);

    if (!image) {
        return null;
    }
    return <Image style={stylesheet(cn("image", className))} src={image} />
}