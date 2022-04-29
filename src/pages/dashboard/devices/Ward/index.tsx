import React, { useMemo, useState, lazy, useCallback } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { CSVLink } from "react-csv";

import { PATH } from "common/constants/routes";
import { getQueryFromLocation } from "common/functions";

import SearchBoxTable from "components/SearchBoxTable";

import Table, { IColumns } from "designs/Table";
import ActionButtons from "designs/ActionButtons";
import SimpleSelect from "designs/SimpleSelect";
import StatusTag from "components/StatusTag";
import Link from "designs/Link";

import TableLayout from "layouts/Table";

import { usePage } from "hooks/usePage";
import { useLoading } from "hooks/useLoading";
import { useBreadcrumb } from "hooks/useBreadcrumb";

import { IProvince, IWard, IConfiguredDevice } from "typings";

import { TopButton, SearchBoxWrapper } from "./styles";
import SVG from "designs/SVG";

const EmergencyBroadcastDialog = lazy(
  () => import("./EmergencyBroadcastDialog"),
);

const EmergencyPauseDialog = lazy(() => import("./EmergencyPauseDialog"));

const RestartDialog = lazy(() => import("./RestartDialog"));

const DeleteDialog = lazy(() => import("./DeleteDialog"));

const VolumeDialog = lazy(() => import("./VolumeDialog"));

const LOAD_DATA = "LOAD_DATA";

interface IWardDeviceProps extends RouteComponentProps {}

const WardDevice: React.FC<IWardDeviceProps> = ({ location }) => {
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");
  const [provinceSelected, setProvinceSelected] = useState<IProvince | null>(
    null,
  );
  const [districtSelected, setDistrictSelected] =
    useState<IConfiguredDevice | null>(null);
  const [wardSelected, setWardSelected] = useState<IWard | null>(null);

  const [listCategories, setListCategories] = useState<IConfiguredDevice[]>([]);
  const [totalCount, setTotalCount] = useState<number>(listDevice.length);
  const { startLoading, stopLoading } = useLoading();

  useBreadcrumb([
    {
      name: "Quản lý thiết bị",
      href: "#",
    },
    {
      name: "Cấp Phường/Xã/Thị Trấn",
      href: PATH.DEVICE.WARD,
    },
  ]);

  // useEffect(() => {
  // }, [page, sizePerPage, searchText, provinceSelected]);

  const renderAction = (record: IConfiguredDevice) => {
    return (
      <ActionButtons
        buttons={{
          config: {
            DialogContent: props => (
              <Redirect
                to={{
                  pathname: PATH.DEVICE.EDIT_DEVICE.replace(":id", record.id!),
                }}
              />
            ),
          },
          delete: {
            DialogContent: props => (
              <DeleteDialog
                onSuccess={async () => {
                  // await deleteBlogAPI({ id: record._id });
                  // invokeGetAllBlogList();
                }}
                editField={record}
                open
                {...props}
              />
            ),
          },
          volume: {
            DialogContent: props => (
              <VolumeDialog
                onSuccess={async () => {
                  // await deleteBlogAPI({ id: record._id });
                  // invokeGetAllBlogList();
                }}
                editField={record}
                open
                {...props}
              />
            ),
          },
          restart: {
            title: "Khởi động lại",
            message: "Bạn có chắc chắn muốn khởi động lại thiết bị này?",
            onRestart: async () => {},
          },
        }}
      />
    );
  };

  const columns: IColumns = useMemo(
    () => [
      {
        text: "Tên thiết bị",
        dataField: "name",
        headerStyle: () => ({
          width: "18%",
        }),
      },
      {
        text: "Mã thiết bị",
        dataField: "deviceId",
        headerStyle: () => ({
          width: "18%",
        }),
      },
      {
        text: "Âm lượng",
        dataField: "volume",
        headerStyle: () => ({
          width: "18%",
        }),
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
        headerStyle: () => ({
          width: "18%",
        }),
      },
      {
        text: "Trạng thái",
        dataField: "status",
        formatter: (status: boolean) => (
          <StatusTag
            active={status}
            activeLabel="Đang phát"
            inactiveLabel="Đang nghỉ"
          />
        ),
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (_: string, record: IConfiguredDevice) =>
          renderAction(record),
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
      title="Thiết bị cấp Phường/Xã/Thị Trấn"
      buttonMenu={
        <div className="flex flex-col gap-2 items-end w-full phone:w-auto overflow-x-auto max-w-full pretty-scroll pb-">
          <div className="flex flex-row gap-2 w-full phone:w-auto">
            <CSVLink data={listDevice} filename="danh-sach-thiet-bi.csv">
              <TopButton>Xuất báo cáo</TopButton>
            </CSVLink>
          </div>
          <div className="flex flex-row gap-2 w-full phone:w-auto">
            <EmergencyBroadcastDialog
              ButtonMenu={<TopButton variant="third">Phát khẩn cấp</TopButton>}
            />
            <EmergencyPauseDialog
              ButtonMenu={
                <TopButton variant="danger" className="w-full">
                  Dừng khẩn cấp
                </TopButton>
              }
            />
            <RestartDialog
              ButtonMenu={
                <TopButton variant="blue" className="w-full">
                  Khởi động lại
                </TopButton>
              }
            />
          </div>
        </div>
      }
    >
      <SearchBoxWrapper>
        <SearchBoxTable
          onFetchData={handleFetchData}
          placeholder="Tìm kiếm theo tên thiết bị"
          className="w-full phone:max-w-35"
        />
        <SimpleSelect
          options={provinceList}
          optionSelected={provinceSelected}
          onSelect={value => {
            setProvinceSelected(value);
            setPage(1);
          }}
          placeholder="Tỉnh/TP"
          className="w-full phone:max-w-35"
        />
        <SimpleSelect
          options={districtList}
          optionSelected={districtSelected}
          onSelect={value => {
            setDistrictSelected(value);
            setPage(1);
          }}
          placeholder="Quận/Huyện/Thị Xã"
          disabled={provinceSelected ? false : true}
          className="w-full phone:max-w-35"
        />
        <SimpleSelect
          options={wardList}
          optionSelected={wardSelected}
          onSelect={value => {
            setWardSelected(value);
            setPage(1);
          }}
          placeholder="Phường/Xã/Thị Trấn"
          disabled={districtSelected ? false : true}
          className="w-full phone:max-w-35"
        />
      </SearchBoxWrapper>

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

export default WardDevice;

export const listDevice: any[] = [
  {
    id: "1",
    name: "admin1",
    deviceId: "1",
    volume: "100",
    status: true,
    type: 1,
  },
  {
    id: "2",
    name: "admin1",
    deviceId: "1",
    volume: "100",
    status: false,
    type: 2,
  },
  {
    id: "3",
    name: "admin1",
    deviceId: "1",
    volume: "100",
    status: true,
    type: 3,
  },
  {
    id: "4",
    name: "admin1",
    deviceId: "1",
    volume: "100",
    status: true,
    type: 4,
  },
];

const provinceList: IProvince[] = [
  {
    id: 1,
    displayName: "TP HCM",
  },
  {
    id: 2,
    displayName: "TP HN",
  },
  {
    id: 3,
    displayName: "TP HP",
  },
];

const districtList: IConfiguredDevice[] = [
  {
    id: "1",
    name: "Quận 1",
  },
  {
    id: "2",
    name: "Quận 2",
  },
  {
    id: "3",
    name: "Quận 3",
  },
];

const wardList: IWard[] = [
  {
    id: "1",
    name: "Quận 1",
  },
  {
    id: "2",
    name: "Quận 2",
  },
  {
    id: "3",
    name: "Quận 3",
  },
];
