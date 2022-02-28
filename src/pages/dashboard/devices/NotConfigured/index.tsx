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

const EmergencyBroadcastDialog = lazy(
  () => import("./EmergencyBroadcastDialog"),
);

const EmergencyPauseDialog = lazy(() => import("./EmergencyPauseDialog"));

const RestartDialog = lazy(() => import("./RestartDialog"));

const DeleteDialog = lazy(() => import("./DeleteDialog"));

const VolumeDialog = lazy(() => import("./VolumeDialog"));

const LOAD_DATA = "LOAD_DATA";

interface IDistrictProps extends RouteComponentProps {}

const NotConfigureDevice: React.FC<IDistrictProps> = ({ location }) => {
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
      name: "Chưa cấu hình",
      href: PATH.DEVICE.NOT_CONFIGURED,
    },
  ]);

  // useEffect(() => {
  // }, [page, sizePerPage, searchText, provinceSelected]);

  const renderAction = (record: IConfiguredDevice) => {
    return (
      <ActionButtons
        buttons={{
          edit: {
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
          width: "26%",
        }),
      },
      {
        text: "Mã thiết bị",
        dataField: "deviceId",
        headerStyle: () => ({
          width: "26%",
        }),
      },
      {
        text: "Âm lượng",
        dataField: "volume",
        headerStyle: () => ({
          width: "20%",
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
      title="Thiết bị chưa cấu hình"
      buttonMenu={
        <div className="flex flex-col gap-2 items-end w-full phone:w-auto overflow-x-auto max-w-full pretty-scroll pb-">
          <div className="flex flex-row gap-2 w-full phone:w-auto">
            <CSVLink data={listDevice} filename="danh-sach-thiet-bi.csv">
              <TopButton variant="secondary">Xuất báo cáo</TopButton>
            </CSVLink>
            <Link
              to={PATH.DEVICE.CREATE_DEVICE}
              className="w-full phone:w-auto"
            >
              <TopButton>Thêm thiết bị</TopButton>
            </Link>
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

export default NotConfigureDevice;

export const listDevice: any[] = [
  {
    id: "1",
    name: "admin1",
    deviceId: "1",
    volume: "100",
    status: true,
  },
  {
    id: "2",
    name: "admin1",
    deviceId: "1",
    volume: "100",
    status: false,
  },
  {
    id: "3",
    name: "admin1",
    deviceId: "1",
    volume: "100",
    status: true,
  },
  {
    id: "4",
    name: "admin1",
    deviceId: "1",
    volume: "100",
    status: true,
  },
];

const provinceList: IProvince[] = [
  {
    id: "1",
    name: "TP HCM",
  },
  {
    id: "2",
    name: "TP HN",
  },
  {
    id: "3",
    name: "TP HP",
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
