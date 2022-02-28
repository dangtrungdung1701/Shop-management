export const PATH = {
  NOT_FOUND: "/not-found",
  DASHBOARD: "/dashboard",
  AUTH: {
    SELF: "/auth",
    LOGIN: "/auth/login",
  },
  USER: "/user",
  DEVICE: {
    SELF: "/device",
    CONFIGURED: "/device/configured",
    NOT_CONFIGURED: "/device/not-configured",
    CREATE_DEVICE: "/device/create",
    EDIT_DEVICE: "/device/edit/:id",
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
