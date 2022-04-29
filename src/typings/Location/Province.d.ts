export interface IProvince {
  id?: number;
  parentId?: number;
  provinceId?: number;
  districtId?: number;
  wardId?: number;
  levelId?: number;
  displayName?: string;
  connectDevice?: number;
  disconnectDevice?: number;
  activeDevice?: number;
  inactiveDevice?: number;
}

export interface IProvinceInput {
  name: string;
}
