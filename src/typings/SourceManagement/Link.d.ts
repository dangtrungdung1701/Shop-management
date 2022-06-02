import { IUser } from ".";
import { ILatestModifiedByUser } from "./FileAudio";

export interface ILink {
  id?: string;
  displayName?: string;
  regionId?: number;
  lastUsedTimeStamp?: number;
  uploadTimeStamp?: number;
  url?: string;
  latestModifiedByUser?: ILatestModifiedByUser;
}

export interface ILinkInput {
  name?: string;
  url?: string;
}
