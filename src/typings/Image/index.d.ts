import { IMongoObjectId } from "typings";

export interface IImageSizeInput {
  width?: number | null;
  height?: number | null;
}
export interface ICustomSizeImages {
  default?: string;
  small?: string | null;
  medium?: string;
}
export interface ICustomSizeImagesInput {
  small?: IImageSizeInput;
  medium?: IImageSizeInput;
  base64Image?: IImageSizeInput;
}

export interface IURLCustomSizeImages {
  default?: string;
  medium?: string;
  small?: string;
  base64Image?: IMongoObjectId;
}

export interface ICreateImage {
  image: Upload;
  customSizeForUploadImage: ICustomSizeImagesInput;
}
