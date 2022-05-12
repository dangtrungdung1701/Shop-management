export interface IEmergencyBroadcastInput {
  name?: string;
  device?: string[];
  source?: string;
  file?: string;
}

export interface IEmergencyPauseInput {
  device?: string[];
}

export interface IRestartInput {
  device?: string[];
}

export interface IDeleteDeviceInput {
  userId?: string;
  password?: string;
}

export interface IVolumeDeviceInput {
  volume?: number | number[];
}
