import React, { useEffect, useMemo, useState } from "react";

import Table, { IColumns } from "designs/Table";
import SVG from "designs/SVG";

import StatusTag from "components/StatusTag";
import { usePage } from "hooks/usePage";
import TableLayout from "layouts/Table";
import { IDevice } from "typings";

import { Title } from "./styles";

interface IDeviceListProps {
  editField?: IDevice[];
}

const DeviceList: React.FC<IDeviceListProps> = ({ editField }) => {
  const [page, setPage] = usePage(1);

  const [listDevice, setListDevice] = useState<IDevice[]>([]);

  useEffect(() => {
    if (editField) setListDevice(editField);
  }, [editField]);

  const columns: IColumns = useMemo(
    () => [
      {
        text: "ID",
        dataField: "id",
      },
      {
        text: "Tên thiết bị",
        dataField: "displayName",
      },
      {
        text: "Âm lượng",
        dataField: "volume",
      },

      {
        text: "Tín hiệu",
        dataField: "connectionStatus.signalStrength",
        formatter: (signalStrength: number) => {
          switch (signalStrength) {
            case 1:
              return <SVG name="device/connect-1" />;
            case 2:
              return <SVG name="device/connect-2" />;
            case 3:
              return <SVG name="device/connect-3" />;
            case 4:
              return <SVG name="device/connect-4" />;
            default:
              return <SVG name="device/bad-status" />;
          }
        },
      },
      {
        text: "Trạng thái",
        dataField: "mediaStatus.status",
        formatter: (status: number) => (
          <StatusTag statusId={status} className="w-full float-right" />
        ),
      },
    ],
    [],
  );

  return (
    <TableLayout>
      <Title>Danh sách thiết bị</Title>
      <Table
        data={listDevice}
        totalSize={listDevice.length}
        sizePerPage={1000}
        columns={columns}
        page={page}
        isShowChangeSize={false}
      />
    </TableLayout>
  );
};

export default DeviceList;
