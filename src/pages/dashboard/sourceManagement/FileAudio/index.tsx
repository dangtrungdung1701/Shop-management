import React, { useEffect, useMemo, useState, lazy, useCallback } from "react";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import { PATH } from "common/constants/routes";
import { getQueryFromLocation, HTMLdecode } from "common/functions";
import axiosClient from "common/utils/api";

import SearchBoxTable from "components/SearchBoxTable";

import Table, { IColumns } from "designs/Table";
import ActionButtons from "designs/ActionButtons";

import TableLayout from "layouts/Table";

import { usePage } from "hooks/usePage";
import { useLoading } from "hooks/useLoading";
import { useBreadcrumb } from "hooks/useBreadcrumb";

import { IFileAudio, IGetAllSource } from "typings";

import useStore from "zustand/store";

import { ButtonAddFileAudio, SearchBoxWrapper } from "./styles";

const FileAudioDialog = lazy(() => import("./FileAudioDialog"));

const LOAD_DATA = "LOAD_DATA";
const DELETE_DATA = "DELETE_DATA";

interface IRegionProps extends RouteComponentProps {}

const FileAudio: React.FC<IRegionProps> = ({ location }) => {
  const { setCurrentUser, currentUser, uploadProgress } = useStore();

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");

  const [listFileAudio, setListFileAudio] = useState<IFileAudio[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
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
    getAllFileAudioService();
  }, [page, sizePerPage, searchText]);

  const getAllFileAudioService = async () => {
    const payload: IGetAllSource = {
      level: currentUser?.userInfo?.region?.levelId,
      regionId: currentUser?.userInfo?.region?.id,
      page,
      size: sizePerPage,
      searchString: searchText,
    };
    try {
      startLoading(LOAD_DATA);

      const res: any = await axiosClient.get("/AudioFileSource", {
        params: payload,
      });
      if (res) {
        setListFileAudio(res.files);
        setTotalCount(res.totalCount);
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading(LOAD_DATA);
    }
  };

  const renderAction = (record: IFileAudio) => {
    return (
      <ActionButtons
        buttons={{
          edit: {
            DialogContent: props => (
              <FileAudioDialog
                onSuccess={() => {
                  getAllFileAudioService();
                }}
                open
                editField={record}
                {...props}
              />
            ),
          },
          delete: {
            title: "Xóa tệp tin",
            message: `Bạn có chắc chắn muốn xóa tệp tin này này?`,
            onDelete: async () => {
              try {
                startLoading(DELETE_DATA);
                const res = await axiosClient.delete(
                  `/AudioFileSource/${record?.id}`,
                );
                if (res) {
                  toast.dark("Xóa tệp tin thành công !", {
                    type: toast.TYPE.SUCCESS,
                  });
                  getAllFileAudioService();
                }
              } catch (error) {
                console.log(error);
                toast.dark("Xóa tệp tin không thành công !", {
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
        text: "Tên tệp tin",
        dataField: "displayName",
        headerStyle: () => ({
          width: "28%",
        }),
        formatter: (displayName: string) => {
          return <div>{HTMLdecode(displayName)}</div>;
        },
      },
      {
        text: "Thời lượng",
        dataField: "duration",
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
        formatter: (_: string, record: IFileAudio) => renderAction(record),
      },
    ],
    [page, listFileAudio],
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
          onSuccess={() => {
            getAllFileAudioService();
          }}
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
