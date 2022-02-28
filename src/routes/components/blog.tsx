import { lazy } from "react";

import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";

import BlogIcon from "icons/Dashboard/Blog";

const Blog = lazy(() => import("pages/dashboard/Blog"));

export const blogRoute: IRoutes = {
  name: "Bài viết",
  path: PATH.BLOG,
  exact: true,
  Component: Blog,
  isPrivate: true,
  Icon: <BlogIcon />,
};
