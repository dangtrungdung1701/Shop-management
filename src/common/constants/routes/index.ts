export const PATH = {
  NOT_FOUND: "/not-found",
  DASHBOARD: "/dashboard",
  AUTH: {
    SELF: "/auth",
    LOGIN: "/auth/login",
  },
  USER: "/user",
  MAP: "/map",
  SCHEDULE: {
    SELF: "/schedule",
    CREATE: "/schedule/create",
    EDIT: "/schedule/edit/:id",
  },
  DEVICE: {
    SELF: "/device",
    PROVINCE: "/device/province",
    DISTRICT: "/device/district",
    WARD: "/device/ward",
    EDIT_DEVICE: "/device/:class/:id",
  },
  BLOG: "/blog",
  LOCATION: {
    SELF: "/location",
    PROVINCE: "/location/province",
    DISTRICT: "/location/district",
    WARD: "/location/ward",
  },
  SOURCE_MANAGEMENT: {
    SELF: "/source-management",
    FILE_AUDIO: "/source-management/file-audio",
    LINK: "/source-management/link",
    FM: "/source-management/fm",
    CONVERT: "/source-management/convert",
  },
  EMERGENCY: {
    SELF: "/emergency",
    DETAIL: "/emergency/detail/:id",
  },
};

const getAllStringValuesOfObject = <T>(obj: T): string[] => {
  if (!obj) return [];
  const values: string[] = [];
  for (let key in obj) {
    const currValue = obj[key];
    if (typeof currValue === "string") values.push(currValue);
    else if (typeof currValue === "object")
      values.push(...getAllStringValuesOfObject(currValue));
  }
  return values;
};

export const PATH_URLS = getAllStringValuesOfObject(PATH);
