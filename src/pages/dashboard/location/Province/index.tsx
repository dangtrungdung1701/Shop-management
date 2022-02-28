import React, { useEffect, useMemo, useState, lazy, useCallback } from "react";
import { RouteComponentProps } from "react-router";

import { usePage } from "hooks/usePage";
import { useLoading } from "hooks/useLoading";
import { useBreadcrumb } from "hooks/useBreadcrumb";

import SearchBoxTable from "components/SearchBoxTable";
import Table, { IColumns } from "designs/Table";
import ActionButtons from "designs/ActionButtons";
import TableLayout from "layouts/Table";

import { PATH } from "common/constants/routes";
import { getQueryFromLocation } from "common/functions";

import { SearchBoxWrapper } from "./styles";
import { IProvince } from "typings";

const ProvinceDialog = lazy(() => import("./ProvinceDialog"));

const LOAD_DATA = "LOAD_DATA";

interface IProvinceProps extends RouteComponentProps {}

const Province: React.FC<IProvinceProps> = ({ location }) => {
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");

  const [listCategories, setListCategories] = useState<IProvince[]>([]);
  const [totalCount, setTotalCount] = useState<number>(listProvince.length);
  const { startLoading, stopLoading } = useLoading();

  useBreadcrumb([
    {
      name: "Quản lý địa phương",
      href: "#",
    },
    {
      name: "Tỉnh/TP",
      href: PATH.LOCATION.PROVINCE,
    },
  ]);

  // useEffect(() => {
  // }, [page, sizePerPage, searchText]);

  const renderAction = (record: IProvince) => {
    return (
      <ActionButtons
        buttons={{
          edit: {
            DialogContent: props => (
              <ProvinceDialog
                onSuccess={() => {
                  // invokeGetAllCategory();
                }}
                open
                editField={record}
                {...props}
              />
            ),
          },
        }}
      />
    );
  };

  const columns: IColumns = useMemo(
    () => [
      {
        text: "Tỉnh/TP",
        dataField: "name",
        headerStyle: () => ({
          width: "28%",
        }),
      },
      {
        text: "Đang hoạt động",
        dataField: "connectDevice",
      },
      {
        text: "Mất kết nối",
        dataField: "disconnectDevice",
      },
      {
        text: "Đang phát",
        dataField: "activeDevice",
      },
      {
        text: "đang nghỉ",
        dataField: "inactiveDevice",
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (_: string, record: IProvince) => renderAction(record),
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
    <TableLayout title="Tỉnh/TP">
      <SearchBoxWrapper>
        <SearchBoxTable
          onFetchData={handleFetchData}
          placeholder="Tìm kiếm theo tên Tỉnh/TP"
        />
      </SearchBoxWrapper>

      <Table
        data={listProvince}
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

export default Province;

const listProvince: IProvince[] = [
  {
    id: "1",
    name: "TP HCM",
    connectDevice: 100,
    disconnectDevice: 100,
    inactiveDevice: 100,
    activeDevice: 100,
  },
  {
    id: "2",
    name: "TP HCM",
    connectDevice: 100,
    disconnectDevice: 100,
    inactiveDevice: 100,
    activeDevice: 100,
  },
  {
    id: "3",
    name: "TP HCM",
    connectDevice: 100,
    disconnectDevice: 100,
    inactiveDevice: 100,
    activeDevice: 100,
  },
  {
    id: "4",
    name: "TP HCM",
    connectDevice: 100,
    disconnectDevice: 100,
    inactiveDevice: 100,
    activeDevice: 100,
  },
];
