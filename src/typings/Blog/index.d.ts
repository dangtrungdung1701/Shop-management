import {
  ICustomSizeImages,
  ICustomSizeImagesInput,
  IUpload,
  IUser,
} from "typings";

export interface IBlog {
  id?: string;
  title?: string;
  image?: ICustomSizeImages;
  createdTime?: string; //Date
  createdPerson?: IUser;
  content?: string;
  description?: string;
}

export interface IBlogInput {
  title?: string;
  image?: IUpload;
  customSizeForUploadImage?: ICustomSizeImagesInput;
  description?: string;
  content?: string;
}
