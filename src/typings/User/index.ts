export type IPermission = "ADMIN" | "USER";
export type IRole = "PROVINCE" | "DISTRICT" | "WARD";

export type IPermissionV2Id =
  | "UserManager"
  | "AudioSourceManager"
  | "DeviceManager"
  | "RegionManager"
  | "ScheduleManager";

export interface IPermissionV2 {
  id?: IPermissionV2Id;
  name?: string;
}

export interface IRegion {
  id?: number;
  parentId?: number;
  provinceId?: number;
  districtId?: number;
  wardId?: number;
  levelId?: number;
  displayName?: string;
}

export interface IUser {
  id?: string;
  userName?: string;
  displayName?: string;
  roles?: IPermissionV2[];
  region?: IRegion;
}

export interface IUserInput {
  userName?: string;
  displayName?: string;
  password?: string;
  regionId?: number;
  roles?: string[];
  regionLevelId?: number;
}
