// Warning! Removes style.{outline, transition} from element.
export const highlightElement = (element: HTMLElement) => {
    element.style.outline = "3px solid blue";
    element.style.outlineOffset = "-3px";
    setTimeout(() => {
        element.style.transition = "outline 1s ease-in-out";
        element.style.outline = "3px solid rgba(0,0,0,0)";
    }, 2000);
    setTimeout(() => {
        element.style.outline = "";
        element.style.transition = "";
        element.style.outlineOffset = "";
    }, 3000);
}