import { IDevice } from "typings/DeviceManagement";
import { IRegion } from "typings/Location";
import { IScheduleType } from "typings/Schedule";
import { IAudioFileSource, IFM, ILink } from "typings/SourceManagement";

export interface IEmergencyPrograms {
  sourceType: IScheduleType;
  displayName: string;
  startTime: number;
  endTime: number;
  fileLoopCount: number;
  volume: number;
  id: string;
  creationDate: number;
  region: IRegion;
  createdByUser: {
    id: string;
    userName: string;
    displayName: string;
  };
  audioFileSource: IAudioFileSource;
  audioLinkSource: ILink;
  audioFmSource: IFM;
  devices: IDevice[];
  totalDuration: string;
  status: number;
}

export interface IEmergencyProgramInput {
  sourceType?: number;
  displayName?: string;
  startTime?: number;
  endTime?: number;
  fileLoopCount?: number;
  volume?: number;
  regionId?: number;
  audioSourceId?: string;
  deviceIds?: string[];
}

export interface IEmergencyProgramInput {
  sourceType?: number;
  displayName?: string;
  startTime?: number;
  endTime?: number;
  fileLoopCount?: number;
  volume?: number;
  regionId?: number;
  audioSourceId?: string;
  deviceIds?: string[];
}
