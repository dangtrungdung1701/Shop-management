import React, { useEffect, useMemo, useState, lazy, useCallback } from "react";
import { RouteComponentProps } from "react-router";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { PATH } from "common/constants/routes";
import { getQueryFromLocation } from "common/functions";
import axiosClient from "common/utils/api";

import SearchBoxTable from "components/SearchBoxTable";

import Table, { IColumns } from "designs/Table";
import ActionButtons from "designs/ActionButtons";

import TableLayout from "layouts/Table";

import { usePage } from "hooks/usePage";
import { useLoading } from "hooks/useLoading";
import { useBreadcrumb } from "hooks/useBreadcrumb";

import { IGetAllSource, ILink } from "typings";

import useStore from "zustand/store";

import { ButtonAddFileAudio, SearchBoxWrapper } from "./styles";

const FileAudioDialog = lazy(() => import("./LinkDialog"));

const LOAD_DATA = "LOAD_DATA";
const DELETE_DATA = "DELETE_DATA";

interface IRegionProps extends RouteComponentProps {}

const Link: React.FC<IRegionProps> = ({ location }) => {
  const { currentUser, setCurrentUser } = useStore();

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");

  const [listLinks, setListLinks] = useState<ILink[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
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
  // get current new userInfo to check permission
  useEffect(() => {
    getUserInfoService();
  }, []);

  const getUserInfoService = async () => {
    try {
      const res: any = await axiosClient.get(
        `User/${currentUser?.userInfo?.id}`,
      );
      if (res) {
        setCurrentUser({ ...currentUser, userInfo: res });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  useEffect(() => {
    getAllLinkService();
  }, [page, sizePerPage, searchText]);

  const getAllLinkService = async () => {
    const payload: IGetAllSource = {
      level: currentUser?.userInfo?.region?.levelId,
      regionId: currentUser?.userInfo?.region?.id,
      page,
      size: sizePerPage,
      searchString: searchText,
    };
    try {
      startLoading(LOAD_DATA);

      const res: any = await axiosClient.get("/AudioLinkSource", {
        params: payload,
      });
      if (res) {
        setListLinks(res.links);
        setTotalCount(res.totalCount);
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading(LOAD_DATA);
    }
  };

  const renderAction = (record: ILink) => {
    return (
      <ActionButtons
        buttons={{
          edit: {
            DialogContent: props => (
              <FileAudioDialog
                onSuccess={() => {
                  getAllLinkService();
                }}
                open
                editField={record}
                {...props}
              />
            ),
          },
          delete: {
            title: "Xóa link tiếp sóng",
            message: `Bạn có chắc chắn muốn xóa link tiếp sóng này?`,
            onDelete: async () => {
              try {
                startLoading(DELETE_DATA);
                const res = await axiosClient.delete(
                  `/AudioLinkSource/${record?.id}`,
                );
                if (res) {
                  toast.dark("Xóa link tiếp sóng thành công!", {
                    type: toast.TYPE.SUCCESS,
                  });
                  getAllLinkService();
                }
              } catch (error) {
                console.log(error);
                toast.dark("Xóa link tiếp sóng không thành công!", {
                  type: toast.TYPE.ERROR,
                });
              } finally {
                stopLoading(DELETE_DATA);
              }
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
        dataField: "displayName",
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
        dataField: "uploadTimeStamp",
        formatter: (uploadTimeStamp: number) => {
          const date = dayjs.unix(uploadTimeStamp).format("DD/MM/YYYY");
          const time = dayjs.unix(uploadTimeStamp).format("HH:mm:ss");
          return `${date} - ${time}`;
        },
      },
      {
        text: "Người tạo",
        dataField: "latestModifiedByUser.displayName",
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (_: string, record: ILink) => renderAction(record),
      },
    ],
    [page, listLinks, searchText, sizePerPage],
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
          onSuccess={() => {
            getAllLinkService();
          }}
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
        data={listLinks}
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
