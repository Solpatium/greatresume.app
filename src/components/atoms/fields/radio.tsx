import React from "react";
import { Radio as _Radio } from "@material-ui/core";
import { RadioProps } from "@material-ui/core/Radio/Radio";
import cn from "classnames";

const classNames = "w-4 h-4 border-2 border-solid border-blue-700 rounded-full";

export const Radio: React.FC<RadioProps> = props => {
  return (
    <_Radio
      {...props}
      checkedIcon={
        <span aria-hidden className={cn(classNames, "border-[5px] border-solid bg-blue-100")} />
      }
      icon={<span aria-hidden className={classNames} />}
    />
  );
};
