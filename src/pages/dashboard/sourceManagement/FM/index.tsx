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

import { ButtonAddFileAudio, SearchBoxWrapper } from "./styles";
import { IFM } from "typings";

const FileAudioDialog = lazy(() => import("./FMDialog"));

const LOAD_DATA = "LOAD_DATA";

interface IRegionProps extends RouteComponentProps {}

const FM: React.FC<IRegionProps> = ({ location }) => {
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");

  const [listCategories, setListCategories] = useState<IFM[]>([]);
  const [totalCount, setTotalCount] = useState<number>(listFM.length);
  const { startLoading, stopLoading } = useLoading();

  useBreadcrumb([
    {
      name: "Quản lý nguồn phát",
      href: "#",
    },
    {
      name: "FM",
      href: PATH.SOURCE_MANAGEMENT.FM,
    },
  ]);

  // useEffect(() => {
  // }, [page, sizePerPage, searchText]);

  const renderAction = (record: IFM) => {
    return (
      <ActionButtons
        buttons={{
          edit: {
            DialogContent: props => (
              <FileAudioDialog
                onSuccess={() => {
                  // invokeGetAllCategory();
                }}
                open
                editField={record}
                {...props}
              />
            ),
          },
          delete: {
            title: "Xóa tệp tin",
            message: `Bạn có chắc chắn muốn xóa kênh FM này?`,
            onDelete: async () => {
              // await removeUserAPI({ id: record._id });
              // invokeGetAllUserAPI();
            },
          },
        }}
      />
    );
  };

  const columns: IColumns = useMemo(
    () => [
      {
        text: "Tên kênh FM",
        dataField: "name",
        headerStyle: () => ({
          width: "20%",
        }),
      },
      {
        text: "Tần số",
        dataField: "frequency",
        headerStyle: () => ({
          width: "8%",
        }),
      },
      {
        text: "RSSI",
        dataField: "rssi",
        headerStyle: () => ({
          width: "8%",
        }),
      },
      {
        text: "C",
        dataField: "c",
        headerStyle: () => ({
          width: "8%",
        }),
      },
      {
        text: "G",
        dataField: "g",
        headerStyle: () => ({
          width: "8%",
        }),
      },
      {
        text: "Thời gian tạo",
        dataField: "createdTime",
      },
      {
        text: "Người tạo",
        dataField: "createdPerson.name",
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (_: string, record: IFM) => renderAction(record),
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
      title="Quản lý kênh FM"
      buttonMenu={
        <FileAudioDialog
          ButtonMenu={<ButtonAddFileAudio>Thêm kênh FM</ButtonAddFileAudio>}
          onSuccess={() => {}}
        />
      }
    >
      <SearchBoxWrapper>
        <SearchBoxTable
          onFetchData={handleFetchData}
          placeholder="Tìm kiếm theo tên kênh FM"
        />
      </SearchBoxWrapper>

      <Table
        data={listFM}
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

export default FM;

const listFM: IFM[] = [
  {
    id: "1",
    name: "Kênh FM 1",
    frequency: 3,
    rssi: 3,
    c: 3,
    g: 3,
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
  {
    id: "2",
    name: "Kênh FM 2",
    frequency: 3,
    rssi: 3,
    c: 3,
    g: 3,
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
  {
    id: "3",
    name: "Kênh FM 3",
    frequency: 3,
    rssi: 3,
    c: 3,
    g: 3,
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
  {
    id: "4",
    name: "Kênh FM 4",
    frequency: 3,
    rssi: 3,
    c: 3,
    g: 3,
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
];
