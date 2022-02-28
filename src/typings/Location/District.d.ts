import { IProvince } from ".";

export interface IDistrict {
  id?: string;
  name?: string;
  connectDevice?: number;
  disconnectDevice?: number;
  activeDevice?: number;
  inactiveDevice?: number;
  province?: IProvince;
}

export interface IDistrictInput {
  name: string;
  province: string;
}
