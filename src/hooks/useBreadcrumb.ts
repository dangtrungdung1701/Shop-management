import { useCallback, useEffect, useRef } from "react";

import { IBreadcrumb } from "typings";

import useStore from "zustand/store";

export const useBreadcrumb = (initBreadcrumb: IBreadcrumb) => {
  const { setBreadcrumb: setBreadcrumbAction } = useStore();
  const breadcrumb = useRef(initBreadcrumb);

  useEffect(() => {
    breadcrumb.current = initBreadcrumb;
    setBreadcrumb(initBreadcrumb);
  }, []);

  const setBreadcrumb = useCallback((breadcrumb: IBreadcrumb) => {
    setBreadcrumbAction(breadcrumb);
  }, []);

  return { breadcrumb, setBreadcrumb };
};
