import { lazy } from "react";

import { PATH } from "common/constants/routes";

import SourceAudio from "icons/Dashboard/SourceAudio";

import { IRoutes } from "typings";

const FileAudio = lazy(
  () => import("pages/dashboard/sourceManagement/FileAudio"),
);
const Link = lazy(() => import("pages/dashboard/sourceManagement/Link"));
const FM = lazy(() => import("pages/dashboard/sourceManagement/FM"));
const Convert = lazy(() => import("pages/dashboard/sourceManagement/Convert"));

export const sourceManagementRoute: IRoutes = {
  name: "Quản lý nguồn phát",
  path: PATH.SOURCE_MANAGEMENT.SELF,
  exact: true,
  isPrivate: true,
  Icon: <SourceAudio />,
  children: [
    {
      name: "Tệp tin",
      path: PATH.SOURCE_MANAGEMENT.FILE_AUDIO,
      exact: true,
      Component: FileAudio,
      isPrivate: true,
    },
    {
      name: "Link tiếp sóng",
      path: PATH.SOURCE_MANAGEMENT.LINK,
      exact: true,
      Component: Link,
      isPrivate: true,
    },
    {
      name: "FM",
      path: PATH.SOURCE_MANAGEMENT.FM,
      exact: true,
      Component: FM,
      isPrivate: true,
    },
    {
      name: "Văn bản",
      path: PATH.SOURCE_MANAGEMENT.CONVERT,
      exact: true,
      Component: Convert,
      isPrivate: true,
    },
  ],
};
