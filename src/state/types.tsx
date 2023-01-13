import { ResumeModel } from "../models/v1";


export interface ApplicationState {
  resume: ResumeModel;
}

export interface ApplicationCache {
  // We don't want to use base64 images for displaying them
  dataUrlImage?: string;
}