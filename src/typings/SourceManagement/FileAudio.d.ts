import { IRegion, IRegion, IRegion } from "typings";
import { number } from "yup";
export type IPermission = "ADMIN" | "USER";
export type IRole = "PROVINCE" | "DISTRICT" | "WARD";

export interface ILatestModifiedByUser {
  id?: string;
  userName?: string;
  displayName?: string;
}
export interface IFileAudio {
  id?: string;
  displayName?: string;
  fileSize?: number;
  duration?: string;
  region?: IRegion;
  lastUsedTimeStamp?: number;
  uploadTimeStamp?: number;
  url?: string;
  latestModifiedByUser?: ILatestModifiedByUser;
}

export interface IGetAllFileAudio {
  level?: number;
  regionId?: number;
  excludeRegionId?: number;
  page?: number;
  size?: number;
  searchString?: string;
}

export interface IFileAudioInput {
  name?: string;
  fileAudio?: File | string | undefined;
}
