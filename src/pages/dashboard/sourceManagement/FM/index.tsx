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
import useCheckPermission from "hooks/useCheckPermission";

import { IFM, IGetAllSource } from "typings";

import useStore from "zustand/store";

import { ButtonAddFileAudio, SearchBoxWrapper } from "./styles";

const FileAudioDialog = lazy(() => import("./FMDialog"));

const LOAD_DATA = "LOAD_DATA";
const DELETE_DATA = "DELETE_DATA";

interface IRegionProps extends RouteComponentProps {}

const FM: React.FC<IRegionProps> = ({ location }) => {
  const { currentUser, setCurrentUser } = useStore();

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");

  const [listFmAudio, setListFmAudio] = useState<IFM[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
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

  useEffect(() => {
    getAllFMService();
  }, [page, sizePerPage, searchText]);

  const getAllFMService = async () => {
    const payload: IGetAllSource = {
      level: currentUser?.userInfo?.region?.levelId,
      regionId: currentUser?.userInfo?.region?.id,
      page,
      size: sizePerPage,
      searchString: searchText,
    };
    try {
      startLoading(LOAD_DATA);

      const res: any = await axiosClient.get("/AudioFmSource", {
        params: payload,
      });
      if (res) {
        setListFmAudio(res.fms);
        setTotalCount(res.totalCount);
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading(LOAD_DATA);
    }
  };

  const renderAction = (record: IFM) => {
    return (
      <ActionButtons
        buttons={{
          edit: {
            DialogContent: props => (
              <FileAudioDialog
                onSuccess={() => {
                  getAllFMService();
                }}
                open
                editField={record}
                {...props}
              />
            ),
          },
          delete: {
            title: "Xóa kênh FM",
            message: `Bạn có chắc chắn muốn xóa kênh FM này?`,
            onDelete: async () => {
              try {
                startLoading(DELETE_DATA);
                const res = await axiosClient.delete(
                  `/AudioFmSource/${record?.id}`,
                );
                if (res) {
                  toast.dark("Xóa kênh FM thành công !", {
                    type: toast.TYPE.SUCCESS,
                  });
                  getAllFMService();
                }
              } catch (error) {
                console.log(error);
                toast.dark("Xóa kênh FM không thành công !", {
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
        text: "Tên kênh FM",
        dataField: "displayName",
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
          onSuccess={() => {
            getAllFMService();
          }}
        />
      }
    >
      {useCheckPermission("AudioSourceManager", currentUser) ? (
        <>
          <SearchBoxWrapper>
            <SearchBoxTable
              onFetchData={handleFetchData}
              placeholder="Tìm kiếm theo tên kênh FM"
            />
          </SearchBoxWrapper>

          <Table
            data={listFmAudio}
            columns={columns}
            page={page}
            totalSize={totalCount}
            onPageChange={handleChangePage}
            onSizeChange={handleChangeSize}
            isRemote
          />
        </>
      ) : (
        <div className="h-30 flex items-center justify-center font-bold text-20">
          Bạn không có quyền truy cập trang này
        </div>
      )}
    </TableLayout>
  );
};

export default FM;
