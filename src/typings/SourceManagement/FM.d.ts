import { IUser } from ".";
import { ILatestModifiedByUser } from "./FileAudio";

export interface IFM {
  displayName?: string;
  frequency?: number;
  rssi?: number;
  c?: number;
  g?: number;
  id?: string;
  regionId?: number;
  lastUsedTimeStamp?: number;
  uploadTimeStamp?: number;
  latestModifiedByUser?: ILatestModifiedByUser;
}

export interface IFMInput {
  name?: string;
  frequency?: number;
  rssi?: number;
  c?: number;
  g?: number;
}
