import { ICustomSizeImages } from "typings";

export type IUpload = File;

export interface ICustomUploadInput {
  type?: string;
  url?: ICustomSizeImages;
  file?: IUpload;
}

export type IBase64Image = string;
