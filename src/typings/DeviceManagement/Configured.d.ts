import { IRegion } from "typings";

export interface IDevice {
  id: string;
  connectionStatus?: IConnectionStatus;
  displayName?: string;
  regionId?: number;
  firmware?: string;
  hardware?: string;
  volume?: number;
  isFixedVolume?: boolean;
  location?: ILocation;
  note?: string;
  sim?: ISim;
  region?: IRegion;
  mediaStatus?: IMediaStatus;
  name?: string;
}

export interface ILocation {
  locationDescription?: string;
  longitude?: number;
  latitude?: number;
}

export interface IConnectionStatus {
  timeStamp?: string;
  connectionType?: number;
  signalStrength?: number;
  WanIpAddress?: string;
  LanIpAddress?: string;
  WiFiName?: string;
}

export interface IMediaStatus {
  status?: number;
  currentVolume?: number;
  timeStamp?: number;
}

export interface ISim {
  number?: string;
  startDate?: number;
  endDate?: number;
}
