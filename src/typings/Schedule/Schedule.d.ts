import { ISourceOption } from "common/constants/source";
import { IDevice } from "typings/DeviceManagement";
import { IRegion } from "typings/Location";
import { IFileAudio, IFM, ILink } from "typings/SourceManagement";
import { IUser } from "typings/User";

export interface ISchedule {
  id?: string;
  creationDate?: number;
  region?: IRegion;
  createdByUser?: IUser;
  approvalUser?: IUser;
  approvalStatus?: IApprovalStatusType;
  approvalTimeStamp?: number;
  approvalDescription?: string;
  sourceType?: ISourceType;
  audioFileSource?: IFileAudio;
  audioLinkSource?: ILink;
  audioFmSource?: IFM;
  displayName?: string;
  summary?: string;
  scheduleType?: IScheduleType;
  repeatDays?: number[];
  startDate?: number;
  endDate?: number;
  startTime?: number[];
  endTime?: number[];
  fileLoopCount?: number;
  volume?: number;
  oneDayTotalDuration?: string;
  devices: IDevice[];
}

export type IScheduleType = 1 | 2 | 3;
export type ISourceType = 1 | 2 | 3 | 4;
export type IApprovalStatusType = 1 | 2 | 3;
