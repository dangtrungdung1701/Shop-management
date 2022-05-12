export interface IRegion {
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
  name?: string;
}

export interface IRegionInput {
  name: string;
}
