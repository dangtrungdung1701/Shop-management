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
import { ILink } from "typings";

const FileAudioDialog = lazy(() => import("./LinkDialog"));

const LOAD_DATA = "LOAD_DATA";

interface IProvinceProps extends RouteComponentProps {}

const Link: React.FC<IProvinceProps> = ({ location }) => {
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");

  const [listCategories, setListCategories] = useState<ILink[]>([]);
  const [totalCount, setTotalCount] = useState<number>(listLink.length);
  const { startLoading, stopLoading } = useLoading();

  useBreadcrumb([
    {
      name: "Quản lý nguồn phát",
      href: "#",
    },
    {
      name: "Link tiếp sóng",
      href: PATH.SOURCE_MANAGEMENT.LINK,
    },
  ]);

  // useEffect(() => {
  // }, [page, sizePerPage, searchText]);

  const renderAction = (record: ILink) => {
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
            message: `Bạn có chắc chắn muốn xóa link tiếp sóng này?`,
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
        text: "Tên link tiếp sóng",
        dataField: "name",
        headerStyle: () => ({
          width: "20%",
        }),
      },
      {
        text: "Link tiếp sóng",
        dataField: "url",
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
        formatter: (_: string, record: ILink) => renderAction(record),
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
      title="Quản lý link tiếp sóng"
      buttonMenu={
        <FileAudioDialog
          ButtonMenu={
            <ButtonAddFileAudio>Thêm link tiêp sóng</ButtonAddFileAudio>
          }
          onSuccess={() => {}}
        />
      }
    >
      <SearchBoxWrapper>
        <SearchBoxTable
          onFetchData={handleFetchData}
          placeholder="Tìm kiếm theo tên link tiếp sóng"
        />
      </SearchBoxWrapper>

      <Table
        data={listLink}
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

export default Link;

const listLink: ILink[] = [
  {
    id: "1",
    name: "link 1",
    url: "https://www.example.com",
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
  {
    id: "2",
    name: "link 2",
    url: "https://www.example.com",
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
  {
    id: "3",
    name: "link 3",
    url: "https://www.example.com",
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
  {
    id: "3",
    name: "link 3",
    url: "https://www.example.com",
    createdTime: "01/01/2022 - 17:30",
    createdPerson: {
      id: "1",
      name: "user 1",
    },
  },
];
