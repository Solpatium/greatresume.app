import cn from "classnames";
import { forwardRef, HTMLAttributes } from "react";

export const ListItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
    return <div {...props} ref={ref} className={cn("flex rounded-md p-2 my-2 border border-gray-200", props.className)} />
})