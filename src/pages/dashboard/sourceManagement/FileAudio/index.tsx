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
import { IFileAudio } from "typings";

const FileAudioDialog = lazy(() => import("./FileAudioDialog"));

const LOAD_DATA = "LOAD_DATA";

interface IRegionProps extends RouteComponentProps {}

const FileAudio: React.FC<IRegionProps> = ({ location }) => {
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");

  const [listCategories, setListCategories] = useState<IFileAudio[]>([]);
  const [totalCount, setTotalCount] = useState<number>(listFileAudio.length);
  const { startLoading, stopLoading } = useLoading();

  useBreadcrumb([
    {
      name: "Quản lý nguồn phát",
      href: "#",
    },
    {
      name: "Tệp tin",
      href: PATH.SOURCE_MANAGEMENT.FILE_AUDIO,
    },
  ]);

  // useEffect(() => {
  // }, [page, sizePerPage, searchText]);

  const renderAction = (record: IFileAudio) => {
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
            message: `Bạn có chắc chắn muốn xóa tệp tin này?`,
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
        text: "Tên tệp tin",
        dataField: "name",
        headerStyle: () => ({
          width: "28%",
        }),
      },
      {
        text: "Thời lượng",
        dataField: "totalTime",
        formatter: (totalTime: number) => {
          return <div>{totalTime} phút</div>;
        },
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
        formatter: (_: string, record: IFileAudio) => renderAction(record),
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
      title="Quản lý tệp tin"
      buttonMenu={
        <FileAudioDialog
          ButtonMenu={<ButtonAddFileAudio>Thêm tệp tin</ButtonAddFileAudio>}
          onSuccess={() => {}}
        />
      }
    >
      <SearchBoxWrapper>
        <SearchBoxTable
          onFetchData={handleFetchData}
          placeholder="Tìm kiếm theo tên tệp tin"
        />
      </SearchBoxWrapper>

      <Table
        data={listFileAudio}
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

export default FileAudio;

const listFileAudio: IFileAudio[] = [
  {
    id: "1",
    name: "file 1",
    totalTime: 20,
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
  {
    id: "2",
    name: "file 2",
    totalTime: 20,
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
  {
    id: "3",
    name: "file 3",
    totalTime: 20,
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
  {
    id: "3",
    name: "file 3",
    totalTime: 20,
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
];
