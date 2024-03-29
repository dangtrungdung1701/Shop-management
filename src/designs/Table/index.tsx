/**
 * @note read the document in /src/docs/designs/Table.md.
 * You should read it in gitlab.
 */

import { useEffect, useRef } from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";

import { shouldDecreasePageIndex } from "common/functions";

import Pagination from "components/Pagination";
import EmptyData from "components/EmptyData";

import { TableContainer, Header, PaginationWrapper } from "./styles";

import { ITableProps } from "./interfaces";
import Thumbnail from "./Thumbnail";

export type IColumns = ColumnDescription<any, any>[];

const isJustDeleteAnItem = (prev: number, curr: number) => {
  return prev - curr === 1;
};

const Table = ({
  className = "",
  data,
  columns,
  headerElement,
  sizePerPage = 10,
  onPageChange,
  page = 1,
  isRemote = false,
  totalSize = 0,
  onClickRow,
  onTableChange,
  onSizeChange,
  isShowChangeSize = true,
}: ITableProps) => {
  const prevTotalSize = useRef<number>(totalSize);

  useEffect(() => {
    if (
      isJustDeleteAnItem(prevTotalSize.current, totalSize) &&
      shouldDecreasePageIndex(page, totalSize, sizePerPage)
    ) {
      onPageChange?.(page - 1);
    }
    prevTotalSize.current = totalSize;
  }, [totalSize, page]);

  const handleChangePageNext = (nextPage: number) => {
    onPageChange && onPageChange(nextPage + 1);
  };
  const handleChangePagePrev = (prevPage: number) => {
    onPageChange && onPageChange(prevPage - 1);
  };

  const handleChangeSize = (size: number) => {
    onSizeChange && onSizeChange(size);
  };

  const handleTableChange = (type: string, { page }: Record<any, any>) => {
    const newPage = page - 1;

    onTableChange && onTableChange(newPage);
  };

  const rowEvents = {
    onClick: (rowIndex: number) => {
      onClickRow && onClickRow(rowIndex);
    },
  };

  return (
    <TableContainer className={`custom-table__container ${className}`}>
      <ToolkitProvider
        bootstrap4
        keyField="id"
        data={data}
        columns={columns}
        search
      >
        {(props: any) => (
          <>
            <Header>{headerElement}</Header>
            {totalSize === 0 ? (
              <EmptyData />
            ) : (
              <>
                <BootstrapTable
                  {...props.baseProps}
                  bordered={false}
                  wrapperClasses="table-responsive col-span-12 overflow-x-auto"
                  rowEvents={rowEvents}
                  remote={
                    isRemote && {
                      pagination: true,
                      filter: false,
                      sort: false,
                    }
                  }
                  onTableChange={handleTableChange}
                />
                <PaginationWrapper>
                  <Pagination
                    onSizeChange={handleChangeSize}
                    onChangePageNext={handleChangePageNext}
                    onChangePagePrev={handleChangePagePrev}
                    totalSize={totalSize}
                    page={page}
                    isShowChangeSize={isShowChangeSize}
                  />
                </PaginationWrapper>
              </>
            )}
          </>
        )}
      </ToolkitProvider>
    </TableContainer>
  );
};

Table.Thumbnail = Thumbnail;

export default Table;
