import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import { PATH } from "common/constants/routes";
import { getQueryFromLocation, HTMLdecode } from "common/functions";
import axiosClient from "common/utils/api";
import {
  FILE_SOURCE_ID,
  FM_SOURCE_ID,
  ISourceOption,
  LINK_SOURCE_ID,
  optionSource,
} from "common/constants/source";

import {
  APPROVED_STATUS,
  IApprovedStatus,
  optionApproveStatus,
  PENDING_STATUS,
  REFUSE_STATUS,
} from "common/constants/schedule";

import SearchBoxTable from "components/SearchBoxTable";
import StatusTagV2 from "components/StatusTagV2";

import Table, { IColumns } from "designs/Table";
import ActionButtons from "designs/ActionButtons";
import Link from "designs/Link";
import SimpleSelect from "designs/SimpleSelect";

import TableLayout from "layouts/Table";

import { usePage } from "hooks/usePage";
import { useLoading } from "hooks/useLoading";
import { useBreadcrumb } from "hooks/useBreadcrumb";
import useCheckPermission from "hooks/useCheckPermission";

import { ISchedule } from "typings/Schedule";

import useStore from "zustand/store";

import { TopButton, SearchBoxWrapper } from "./styles";

import ApprovalDialog from "./ApprovalDialog";

const LOAD_DATA = "LOAD_DATA";
const DELETE_DATA = "DELETE_DATA";

interface IScheduleProps extends RouteComponentProps {}

const Schedule: React.FC<IScheduleProps> = ({ location }) => {
  const { currentUser } = useStore();
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");

  const [listSchedule, setListSchedule] = useState<any[]>([]);

  const [totalCount, setTotalCount] = useState<number>(0);
  const { startLoading, stopLoading } = useLoading();

  const [selectedApprovedStatus, setSelectedApprovedStatus] =
    useState<IApprovedStatus | null>(null);
  const [selectedSourceType, setSelectedSourceType] =
    useState<ISourceOption | null>(null);

  useBreadcrumb([
    {
      name: "Quản lý lịch phát",
      href: PATH.SCHEDULE.SELF,
    },
  ]);

  useEffect(() => {
    getAllScheduleService();
  }, [
    page,
    sizePerPage,
    searchText,
    selectedApprovedStatus,
    selectedSourceType,
  ]);

  const getAllScheduleService = async () => {
    const payload: any = {
      regionId: currentUser?.userInfo?.region?.id,
      page,
      size: sizePerPage,
      searchString: searchText,
      approvalStatus: selectedApprovedStatus?.id,
      sourceType: Number(selectedSourceType?.id) || undefined,
    };
    try {
      startLoading(LOAD_DATA);

      const res: any = await axiosClient.get("/Schedule", {
        params: payload,
      });
      if (res) {
        setListSchedule(res.schedules);
        setTotalCount(res.totalCount);
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading(LOAD_DATA);
    }
  };

  const renderAction = (record: ISchedule) => {
    return (
      <ActionButtons
        buttons={{
          ...((() => {
            if (record?.approvalStatus !== PENDING_STATUS) {
              return true;
            }
            if (record?.createdByUser?.id !== currentUser?.userInfo?.id) {
              return true;
            }
            return false;
          })()
            ? {
                info: {
                  DialogContent: props => (
                    <Redirect
                      to={{
                        pathname: PATH.SCHEDULE.EDIT.replace(":id", record.id!),
                      }}
                    />
                  ),
                },
              }
            : {
                edit: {
                  DialogContent: props => (
                    <Redirect
                      to={{
                        pathname: PATH.SCHEDULE.EDIT.replace(":id", record.id!),
                      }}
                    />
                  ),
                },
              }),
          ...(useCheckPermission("ScheduleApproval", currentUser) &&
            record?.approvalStatus === PENDING_STATUS && {
              approve: {
                DialogContent: props => (
                  <ApprovalDialog
                    approvalType={APPROVED_STATUS}
                    editField={record}
                    onSuccess={() => {
                      getAllScheduleService();
                    }}
                    open
                    {...props}
                  />
                ),
              },
              refuse: {
                DialogContent: props => (
                  <ApprovalDialog
                    approvalType={REFUSE_STATUS}
                    editField={record}
                    onSuccess={() => {
                      getAllScheduleService();
                    }}
                    open
                    {...props}
                  />
                ),
              },
            }),
          ...((() => {
            if (record?.createdByUser?.id === currentUser?.userInfo?.id) {
              if (record?.approvalStatus !== APPROVED_STATUS) {
                return true;
              }
            }

            return false;
          })() && {
            delete: {
              title: "Xóa lịch phát",
              message: `Bạn có chắc chắn muốn xóa lịch phát này?`,
              onDelete: async () => {
                try {
                  startLoading(DELETE_DATA);
                  const res = await axiosClient.delete(
                    `/Schedule/${record?.id}`,
                  );
                  if (res) {
                    toast.dark("Xóa lịch phát thành công !", {
                      type: toast.TYPE.SUCCESS,
                    });
                    getAllScheduleService();
                  }
                } catch (error) {
                  console.log(error);
                  toast.dark("Xóa lịch phát không thành công !", {
                    type: toast.TYPE.ERROR,
                  });
                } finally {
                  stopLoading(DELETE_DATA);
                }
              },
            },
          }),
        }}
      />
    );
  };

  const columns: IColumns = useMemo(
    () => [
      {
        text: "Nguồn phát",
        dataField: "sourceType",
        formatter: (sourceType: number) => {
          if (sourceType === Number(FILE_SOURCE_ID)) {
            return <div>Tệp tin</div>;
          }
          if (sourceType === Number(FM_SOURCE_ID)) {
            return <div>Kênh FM</div>;
          }
          if (sourceType === Number(LINK_SOURCE_ID)) {
            return <div>Link tiếp sóng</div>;
          }
          return <div>Mic</div>;
        },
      },
      {
        text: "Tên chương trình",
        dataField: "displayName",
        formatter: (displayName: string) => {
          return <div>{HTMLdecode(displayName)}</div>;
        },
      },
      {
        text: "Ngày phát",
        dataField: "startDate",
        formatter: (startDate: number) => {
          return dayjs.unix(startDate).format("DD/MM/YYYY");
        },
      },
      {
        text: "Thời lượng",
        dataField: "oneDayTotalDuration",
      },
      {
        text: "Người tạo",
        dataField: "createdByUser.displayName",
      },
      {
        text: "Trạng thái duyệt",
        dataField: "approvalStatus",
        formatter: (approvalStatus: number) => {
          switch (approvalStatus) {
            case 1:
              return <StatusTagV2 active="pending" />;
            case 2:
              return <StatusTagV2 active="approved" />;
            case 3:
              return <StatusTagV2 active="refuse" />;
            default:
              return <StatusTagV2 active="approved" />;
          }
        },
      },
      {
        text: "Người duyệt",
        dataField: "approvalUser",
        formatter: (approvalUser: any) => {
          if (!approvalUser) return <div>Chưa được duyệt</div>;
          return <div>{approvalUser?.displayName}</div>;
        },
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (_: string, record: ISchedule) => renderAction(record),
      },
    ],
    [page, listSchedule],
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
        <SimpleSelect
          options={optionApproveStatus}
          optionSelected={selectedApprovedStatus}
          onSelect={value => {
            if (page > 1) {
              setPage(1);
            }
            setSelectedApprovedStatus(value);
          }}
          placeholder="Trạng thái phê duyệt"
          className="w-full phone:max-w-35"
          optionTarget="displayName"
        />
        <SimpleSelect
          options={optionSource}
          optionSelected={selectedSourceType}
          onSelect={value => {
            if (page > 1) {
              setPage(1);
            }
            setSelectedSourceType(value);
          }}
          placeholder="Kiểu nguồn phát"
          className="w-full phone:max-w-35"
          optionTarget="displayName"
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
