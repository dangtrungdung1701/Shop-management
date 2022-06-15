import { INestedItem } from "components/NestedMenu";

import { IRoutes } from "typings";

export const renderItemsForNestedMenu = (
  routes: IRoutes[],
): INestedItem<IRoutes>[] => {
  const items: INestedItem<IRoutes>[] = [];
  for (let route of routes) {
    const item: INestedItem<IRoutes> = {
      data: route,
    };
    if (route?.children) item.items = renderItemsForNestedMenu(route.children);
    items.push(item);
  }
  return items;
};
