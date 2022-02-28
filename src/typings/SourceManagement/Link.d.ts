import { IUser } from ".";

export interface ILink {
  id?: string;
  name?: string;
  createdTime?: string; //Date
  totalTime?: number;
  createdPerson?: IUser;
  url?: string;
}

export interface ILinkInput {
  name?: string;
  url?: string;
}
