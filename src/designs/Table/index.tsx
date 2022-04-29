/**
 * @note read the document in /src/docs/designs/Table.md.
 * You should read it in gitlab.
 */

import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import Pagination from "components/Pagination";
import { ITableProps } from "./interfaces";
import { TableContainer, Header, PaginationWrapper } from "./styles";
import EmptyData from "components/EmptyData";
import Thumbnail from "./Thumbnail";
import { useEffect, useRef } from "react";
import { shouldDecreasePageIndex } from "common/functions";

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
            <BootstrapTable
              {...props.baseProps}
              bordered={false}
              wrapperClasses="table-responsive col-span-12"
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

            {totalSize === 0 && <EmptyData />}
            {totalSize > 0 && (
              <PaginationWrapper>
                <Pagination
                  onSizeChange={handleChangeSize}
                  onChangePageNext={handleChangePageNext}
                  onChangePagePrev={handleChangePagePrev}
                  totalSize={totalSize}
                  page={page}
                />
              </PaginationWrapper>
            )}
          </>
        )}
      </ToolkitProvider>
    </TableContainer>
  );
};

Table.Thumbnail = Thumbnail;

export default Table;
