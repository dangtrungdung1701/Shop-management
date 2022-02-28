import { IUser } from ".";

export interface IFM {
  id?: string;
  name?: string;
  createdTime?: string; //Date
  totalTime?: number;
  createdPerson?: IUser;
  frequency?: number;
  rssi?: number;
  c?: number;
  g?: number;
}

export interface IFMInput {
  name?: string;
  frequency?: number;
  rssi?: number;
  c?: number;
  g?: number;
}
