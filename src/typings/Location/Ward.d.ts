import { IDistrict, IProvince } from ".";

export interface IWard {
  id?: string;
  name?: string;
  connectDevice?: number;
  disconnectDevice?: number;
  activeDevice?: number;
  inactiveDevice?: number;
  province?: IProvince;
  district?: IDistrict;
}

export interface IWardInput {
  name: string;
  province: string;
  district: string;
}
