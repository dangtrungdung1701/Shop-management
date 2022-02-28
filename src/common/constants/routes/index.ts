export const PATH = {
  NOT_FOUND: "/not-found",
  DASHBOARD: "/dashboard",
  USER: {
    SELF: "/user",
    ADMIN: "/user/admin",
    NORMAL: "/user/normal",
  },
  DEVICE: {
    SELF: "/device",
    CONFIGURED: "/device/configured",
    NOT_CONFIGURED: "/device/not-configured",
    CREATE_DEVICE: "/device/create",
    EDIT_DEVICE: "/device/edit/:id",
  },
  ORDER: {
    SELF: "/order",
    ORDER_LIST: "/order/list",
    ORDER_INFO: "/order/info/:id",
    ORDER_OVERVIEW_ITEM_DETAIL: "/order/overview/item-detail",
    SCAN_POINT: "/order/scan-point",
  },
  CHALLENGES: {
    SELF: "/challenges",
    CHALLENGES_LIST: "/challenges/list",
    CHALLENGES_TYPE: "/challenges/type",
    ADD_CHALLENGES: "/challenges/add",
    EDIT_CHALLENGES: "/challenges/edit/:id",
  },

  // Product routes
  PRODUCT_MANAGEMENT_LIST: "/product-management",
  CREATE_PRODUCT: "/product-management/create-product",
  /**
   * @query {String} c1 - initial category level 1
   * @query {String} group - initial level 2's group
   * @query {String} c2 - initial category level 2
   */
  CREATE_BASE_CONFIG_PRODUCT: "/product-management/config-product",
  BASE_CONFIG_PRODUCT: "/product-management/base-config-product/:id",
  PRINTING_CONFIG: "/product-management/printing-config/:id",
  EMBROIDERY_CONFIG: "/product-management/embroidery-config/:id",
  INFO_CONFIG: "/product-management/info-config/:id",

  EDIT_PRODUCT: "/product-management/edit-product",
  BLOG: "/blog",
  AUTH: {
    SELF: "/auth",
    LOGIN: "/auth/login",
  },
  ACCOUNT: {
    SELF: "/account",
  },
  CUSTOMER: {
    SELF: "/customer",
    LIST: "/customer/list",
    DETAIL: "/customer/detail/:id",
  },
  CATEGORY: {
    SELF: "/category",
    CATEGORY_LEVEL1: "/category/level1",
    CATEGORY_LEVEL2: "/category/level2",
    CATEGORY_TAGS: "/category/tags",
  },
  FAQ: {
    SELF: "/faq",
    FAQ_CATEGORY_LEVEL1: "/faq/category-level1",
    FAQ_CATEGORY_LEVEL2: "/faq/category-level2",
    FAQ_ARTICLES: "/faq/articles",
  },
  DESIGN_SETTING: {
    SELF: "/design-setting",
    CLIP_ART_LIST: "/design-setting/clip-art-list",
    CLIP_ART_CATEGORY: "/design-setting/clip-art-category",
    TAGS: "/design-setting/tags",
    PREMIUM_IMAGE: "/design-setting/premium-image",
  },
  FUNDRAISING: {
    SELF: "/fundraising",
    CHARITY_UNIT: "/fundraising/charity-unit",
    FUNDRAISING_PROGRAM: "/fundraising/fundraising-program",
    FUNDRAISING_PROGRAM_INFO: "/fundraising/fundraising-program/:id",
  },
  SETTING: {
    SELF: "/setting",
    GENERAL: "/setting/general",
    SEO: "/setting/seo",
    AD_BY_CODE: "/setting/ad-by-code",
    AD_BY_IMAGE: "/setting/ad-by-image",
    STATIC_WEBSITE: "/setting/static-website",
    TOUCH_LIST: "/setting/touch-list",
    SUBSCRIBE_LIST: "/setting/subscribe-list",
    CUSTOMER_TESTIMONIALS: "/setting/customer-testimonials",
    VIDEO_CONFIG: "/setting/video-config",
  },
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
