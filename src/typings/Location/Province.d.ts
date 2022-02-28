export interface IProvince {
  id?: string;
  name?: string;
  connectDevice?: number;
  disconnectDevice?: number;
  activeDevice?: number;
  inactiveDevice?: number;
}

export interface IProvinceInput {
  name: string;
}
