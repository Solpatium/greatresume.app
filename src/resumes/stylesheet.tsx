import { Style } from "@react-pdf/types";
import { createContext } from "react";

export type StylesDefinition = Record<string, Style>;
export type StyleSheet = (classnames?: string, baseStyle?: Style) => Style;


export const makeStylesheet = (styles: StylesDefinition): StyleSheet => {
    const parsedStyles: [string[], Style][] = [];
    for (const [selector, style] of Object.entries(styles)) {
        const parsedSelector = selector?.split(".").map(s => s.trim()).filter(v => v);
        parsedStyles.push(
            [parsedSelector, style]
        );
    }

    const cache: Record<string, Style> = {};

    return (classnames, baseStyle) => {
        if(classnames === undefined) {
            return baseStyle ?? {};
        }
        if (!baseStyle && cache[classnames] !== undefined) {
            return cache[classnames] as any;
        }
        classnames = classnames ?? "";

        const classes = new Set(classnames.split(" ").map(s => s.trim()));
        
        // Matches need to be sorted by specificality
        const matches: [number, Style][] = [];
        for (const [selector, style] of parsedStyles) {
            const isMatch = selector.every(c => classes.has(c));
            if (isMatch) {
                matches.push([selector.length, style]);
            }
        }

        if (baseStyle) {
            matches.push([Number.NEGATIVE_INFINITY, baseStyle]);
        }

        matches.sort((a,b) => a[0] - b[0]);

        const result: Style = {}
        for (const [_, style] of matches) {
            Object.assign(result, style);
        }

        if(!baseStyle) {
            cache[classnames] = result;
        }

        console.log({classnames, result})

        return result;
    }
}

export const styleContext = createContext<StyleSheet>((_, baseStyle) => (baseStyle ?? {}));