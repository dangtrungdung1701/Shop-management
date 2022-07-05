import React from "react";
import { IColumns } from "./index";

export interface ITableProps {
  /**
   * @description You have to pass data here
   */
  className?: string;
  data: Array<any>;
  columns: IColumns;
  headerElement?: React.FC | string;
  sizePerPage?: number;
  onPageChange?: (page: number) => void;
  page: number;
  onSizeChange?: (size: number) => void;
  isShowChangeSize?: boolean;

  /**
   * @description You have to enable this prop if you want to call API whenever page index changed
   */
  isRemote?: boolean; // when you call api with a part load, use this
  /**
   * @description Total items of response data (or length of array)
   */
  totalSize: number;
  onClickRow?: (rowIndex: number) => void;
  onTableChange?: (page: number) => void;
}
