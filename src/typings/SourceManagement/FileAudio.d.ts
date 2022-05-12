import { IRegion, IRegion, IRegion } from "typings";
export type IPermission = "ADMIN" | "USER";
export type IRole = "PROVINCE" | "DISTRICT" | "WARD";

export interface IFileAudio {
  id?: string;
  name?: string;
  createdTime?: string; //Date
  totalTime?: number;
  createdPerson?: IUser;
  fileAudio?: File | string | undefined;
}

export interface IFileAudioInput {
  name?: string;
  fileAudio?: File | string | undefined;
}
