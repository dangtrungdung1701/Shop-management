import React, { useMemo, useState } from "react";
import dayjs from "dayjs";

import { calDateFromSecond, formatTime, HTMLdecode } from "common/functions";

import Table, { IColumns } from "designs/Table";

import { ISchedule } from "typings/Schedule";

import { Title } from "./styles";

interface IListConflictedScheduleProps {
  editField: ISchedule[];
}

const ListConflictedSchedule: React.FC<IListConflictedScheduleProps> = ({
  editField,
}) => {
  const [totalCount] = useState<number>(editField?.length);

  const columns: IColumns = useMemo(
    () => [
      {
        text: "Tên chương trình",
        dataField: "displayName",
        formatter: (displayName: string) => {
          return <div>{HTMLdecode(displayName)}</div>;
        },
      },
      {
        text: "Ngày bắt đầu",
        dataField: "startDate",
        formatter: (startDate: number) => {
          return <div>{dayjs.unix(startDate).format("DD/MM/YYYY")}</div>;
        },
      },
      {
        text: "Ngày kết thúc",
        dataField: "endDate",
        formatter: (endDate: number) => {
          return <div>{dayjs.unix(endDate).format("DD/MM/YYYY")}</div>;
        },
      },
      {
        text: "Thời gian phát",
        dataField: "startTime",
        formatter: (startTime: number[], endTime: number[]) => {
          return (
            <div className="flex flex-col gap-0.5">
              {startTime.map((item: number, index: number) => {
                <div>
                  {formatTime(calDateFromSecond(item)!)} -{" "}
                  {formatTime(calDateFromSecond(endTime[index])!)}
                </div>;
              })}
            </div>
          );
        },
      },
      {
        text: "Người tạo",
        dataField: "createdByUser.userName",
      },
      {
        text: "Người duyệt",
        dataField: "approvalUser.userName",
      },
    ],
    [],
  );

  return (
    <>
      <Title>Danh sách lịch phát hiện hành</Title>
      <Table
        data={editField}
        columns={columns}
        page={1}
        totalSize={totalCount}
        isRemote
        isShowChangeSize={false}
      />
    </>
  );
};

export default ListConflictedSchedule;
