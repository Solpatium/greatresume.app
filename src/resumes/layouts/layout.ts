import React, { ReactElement } from "react";

export type Renderer<Type> = (data: Type, index: number) => ReactElement;
