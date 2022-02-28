import React, { useCallback, useMemo, useState } from "react";
import TableLayout from "layouts/Table";
import Table, { IColumns } from "designs/Table";
import { getQueryFromLocation } from "common/functions";
import { usePage } from "hooks/usePage";
import SVG from "designs/SVG";
import { Title } from "./styles";

interface IHistoryProps {
  editField?: any;
}

const History: React.FC<IHistoryProps> = ({ editField }) => {
  const [page, setPage] = usePage(1);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(listDevice.length);

  const columns: IColumns = useMemo(
    () => [
      {
        text: "Ngày",
        dataField: "date",
      },
      {
        text: "Thời điểm",
        dataField: "time",
      },
      {
        text: "Kết nối",
        dataField: "type",
        formatter: (type: number) => {
          if (type === 1) return <SVG name="device/ethernet" />;
          if (type === 2) return <SVG name="device/4g" />;
          if (type === 3) return <SVG name="device/wifi" />;
          return <SVG name="device/wifi-off" />;
        },
      },
      {
        text: "Tín hiệu",
        dataField: "status",
        formatter: (status: boolean) =>
          status ? (
            <SVG name="device/good-status" />
          ) : (
            <SVG name="device/bad-status" />
          ),
      },
      {
        text: "Địa chỉ IP",
        dataField: "ip",
        headerStyle: () => ({ width: "10%" }),
        formatter: (ip: string) => {
          return <div className="w-full text-right">{ip}</div>;
        },
      },
    ],
    [],
  );

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleChangeSize = (value: number) => {
    setSizePerPage(value);
    setPage(1);
  };

  return (
    <TableLayout>
      <Title>Lịch sử</Title>
      <Table
        data={listDevice}
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

export default History;

const listDevice: any[] = [
  {
    id: "ADMIN",
    date: "22/22/22",
    time: "12",
    type: 1,
    status: true,
    ip: "1.1.1.1",
  },
  {
    id: "ADMIN",
    date: "22/22/22",
    time: "12",
    type: 2,
    status: false,
    ip: "1.1.1.1",
  },
  {
    id: "ADMIN",
    date: "22/22/22",
    time: "12",
    type: 3,
    status: true,
    ip: "1.1.1.1",
  },
  {
    id: "ADMIN",
    date: "22/22/22",
    time: "12",
    type: 4,
    status: true,
    ip: "1.1.1.1",
  },
];
