import React from "react";
import { ResumeModel } from "../../../models/v1";
import { StateSetter } from "../../../utils/mutators";

export type FormStep = React.FC<{
  goToNext?: () => void;
  goToPrev?: () => void;
  imageDataUrl?: string;
  state: ResumeModel;
  setState: StateSetter<ResumeModel>;
}>;
