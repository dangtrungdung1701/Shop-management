import React, { useMemo, useState, useCallback } from "react";
import { Redirect, RouteComponentProps } from "react-router";

import { PATH } from "common/constants/routes";
import { getQueryFromLocation } from "common/functions";

import SearchBoxTable from "components/SearchBoxTable";

import Table, { IColumns } from "designs/Table";
import ActionButtons from "designs/ActionButtons";
import Link from "designs/Link";

import TableLayout from "layouts/Table";

import { usePage } from "hooks/usePage";
import { useLoading } from "hooks/useLoading";
import { useBreadcrumb } from "hooks/useBreadcrumb";

import { IRegion } from "typings";

import { TopButton, SearchBoxWrapper } from "./styles";

const LOAD_DATA = "LOAD_DATA";

interface IScheduleProps extends RouteComponentProps {}

const Schedule: React.FC<IScheduleProps> = ({ location }) => {
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");

  const [listCategories, setListCategories] = useState<IRegion[]>([]);

  const [totalCount, setTotalCount] = useState<number>(listSchedule.length);
  const { startLoading, stopLoading } = useLoading();

  useBreadcrumb([
    {
      name: "Quản lý lịch phát",
      href: PATH.SCHEDULE.SELF,
    },
  ]);

  // useEffect(() => {
  // }, [page, sizePerPage, searchText, provinceSelected]);

  const renderAction = (record: any) => {
    return (
      <ActionButtons
        buttons={{
          edit: {
            DialogContent: props => (
              <Redirect
                to={{
                  pathname: PATH.SCHEDULE.EDIT.replace(":id", record.id!),
                }}
              />
            ),
          },
          delete: {
            title: "Xóa lịch phát",
            message: `Bạn có chắc chắn muốn xóa lịch phát này?`,
            onDelete: async () => {
              // await deleteBlogAPI({ id: record._id });
              // invokeGetAllBlogList();
            },
          },
        }}
      />
    );
  };

  const columns: IColumns = useMemo(
    () => [
      {
        text: "Nguồn phát",
        dataField: "source",
        headerStyle: () => ({
          width: "20%",
        }),
      },
      {
        text: "Tên chương trình",
        dataField: "name",
        headerStyle: () => ({
          width: "20%",
        }),
      },
      {
        text: "Ngày phát",
        dataField: "date",
        headerStyle: () => ({
          width: "20%",
        }),
      },
      {
        text: "Thời lượng (ph)",
        dataField: "time",
        headerStyle: () => ({
          width: "20%",
        }),
      },
      {
        text: "Người tạo",
        dataField: "user",
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (_: string, record: IRegion) => renderAction(record),
      },
    ],
    [page],
  );

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleFetchData = (value: string) => {
    setSearchText(value);
    setPage(1);
  };

  const handleChangeSize = (value: number) => {
    setSizePerPage(value);
    setPage(1);
  };

  return (
    <TableLayout
      title="Quản lý lịch phát"
      buttonMenu={
        <Link to={PATH.SCHEDULE.CREATE} className="w-full phone:w-auto">
          <TopButton>Thêm lịch phát</TopButton>
        </Link>
      }
    >
      <SearchBoxWrapper>
        <SearchBoxTable
          onFetchData={handleFetchData}
          placeholder="Tìm kiếm theo tên chương trình"
          className="w-full phone:max-w-35"
        />
      </SearchBoxWrapper>

      <Table
        data={listSchedule}
        columns={columns}
        page={page}
        totalSize={totalCount}
        onPageChange={handleChangePage}
        onSizeChange={handleChangeSize}
        isRemote
      />
    </TableLayout>
  );
};

export default Schedule;

const listSchedule: any[] = [
  {
    id: "1",
    source: "Tệp tin",
    name: "Dịch Covid",
    date: "12/2/2000",
    time: "20",
    user: "Luan ECB",
  },
  {
    id: "2",
    source: "Tệp tin",
    name: "Dịch Covid",
    date: "12/2/2000",
    time: "20",
    user: "Luan ECB",
  },
  {
    id: "3",
    source: "Tệp tin",
    name: "Dịch Covid",
    date: "12/2/2000",
    time: "20",
    user: "Luan ECB",
  },
  {
    id: "4",
    source: "Tệp tin",
    name: "Dịch Covid",
    date: "12/2/2000",
    time: "20",
    user: "Luan ECB",
  },
  {
    id: "5",
    source: "Tệp tin",
    name: "Dịch Covid",
    date: "12/2/2000",
    time: "20",
    user: "Luan ECB",
  },
];
