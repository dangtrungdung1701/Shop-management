import React, { useMemo, useState, lazy, useCallback, useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { CSVLink } from "react-csv";

import { PATH } from "common/constants/routes";
import { getQueryFromLocation } from "common/functions";
import axiosClient from "common/utils/api";
import { PROVINCE_ID } from "common/constants/region";
import { DATA_ID, ETHERNET_ID, WIFI_ID } from "common/constants/device";

import SearchBoxTable from "components/SearchBoxTable";
import StatusTag from "components/StatusTag";

import Table, { IColumns } from "designs/Table";
import ActionButtons from "designs/ActionButtons";
import SVG from "designs/SVG";

import TableLayout from "layouts/Table";

import { usePage } from "hooks/usePage";
import { useLoading } from "hooks/useLoading";
import { useBreadcrumb } from "hooks/useBreadcrumb";

import {
  IRegion,
  IDevice,
  IMediaStatus,
  IConnectionStatus,
  IGetAllDevice,
} from "typings";

import useStore from "zustand/store";

import { TopButton, SearchBoxWrapper } from "./styles";

const RestartDialog = lazy(() => import("../Components/RestartDialog"));

const DeleteDialog = lazy(() => import("../Components/DeleteDialog"));

const VolumeDialog = lazy(() => import("../Components/VolumeDialog"));

const LOAD_DATA = "LOAD_DATA";

interface IRegionDeviceProps extends RouteComponentProps {}

const ProvinceDevice: React.FC<IRegionDeviceProps> = ({ location }) => {
  const { currentUser, setCurrentUser } = useStore();

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");

  const [listDevice, setListDevice] = useState<IDevice[]>([]);
  const [totalCount, setTotalCount] = useState<number>(listDevice.length);

  const { startLoading, stopLoading } = useLoading();

  const getDefaultRegionId = (): number => {
    const provinceId = currentUser?.userInfo?.region?.provinceId;
    const districtId = currentUser?.userInfo?.region?.districtId;
    const wardId = currentUser?.userInfo?.region?.wardId;

    if (wardId !== -1) {
      return wardId;
    }
    if (districtId !== -1) {
      return districtId;
    }
    return provinceId;
  };

  const [regionId] = useState(getDefaultRegionId());

  const [CSVData, setCSVData] = useState<any[]>([]);

  useBreadcrumb([
    {
      name: "Quản lý thiết bị",
      href: "#",
    },
    {
      name: "Cấp Tỉnh/TP",
      href: PATH.DEVICE.PROVINCE,
    },
  ]);

  useEffect(() => {
    getAllProvinceDevices();
  }, [page, sizePerPage, searchText, regionId]);

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

  const getAllProvinceDevices = async () => {
    const input: IGetAllDevice = {
      page,
      size: sizePerPage,
      regionId,
      searchString: searchText,
      excludeRegionId: 1,
      level: PROVINCE_ID,
    };
    try {
      startLoading(LOAD_DATA);
      const payload: any = {
        ...input,
      };
      const response: any = await axiosClient.get("/Device", {
        params: payload,
      });
      const response2: any = await axiosClient.get("/Device", {
        params: { ...payload, page: 0, size: 0 },
      });
      if (response2) {
        const exportData = response2?.devices?.map((device: IDevice) => {
          const newDevice = { ...device };
          delete newDevice.connectionStatus;
          delete newDevice.mediaStatus;
          delete newDevice.region;
          delete newDevice.sim;
          delete newDevice.location;

          return {
            ...newDevice,
            locationName: device?.location?.locationDescription,
            locationLatitude: device?.location?.latitude,
            locationLongitude: device?.location?.longitude,
            simNumber: device?.sim?.number,
            connectionType: device?.connectionStatus?.connectionType,
            connectionName: device?.connectionStatus?.WiFiName,
            connectionStrength: device?.connectionStatus?.signalStrength,
            mediaStatus: device?.mediaStatus?.status,
            mediaVolume: device?.mediaStatus?.currentVolume,
            regionId: device?.region?.id,
            regionLevel: device?.region?.levelId,
          };
        });
        setCSVData(exportData);
      }
      if (response) {
        setListDevice(response.devices);
        setTotalCount(response.totalCount);
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading(LOAD_DATA);
    }
  };

  const renderAction = (record: IDevice) => {
    const isFirstItem = record.id === listDevice[listDevice.length - 1].id;
    return (
      <ActionButtons
        isFirstItem={isFirstItem}
        buttons={{
          config: {
            DialogContent: props => (
              <Redirect
                to={{
                  pathname: PATH.DEVICE.EDIT_DEVICE.replace(
                    ":id",
                    record.id!,
                  ).replace(":class", "province"),
                }}
              />
            ),
          },
          delete: {
            DialogContent: props => (
              <DeleteDialog
                onSuccess={() => {
                  getAllProvinceDevices();
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
                onSuccess={() => {
                  getAllProvinceDevices();
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
        dataField: "displayName",
        headerStyle: () => ({
          width: "18%",
        }),
      },
      {
        text: "Mã thiết bị",
        dataField: "id",
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
        dataField: "mediaStatus",
        formatter: (mediaStatus: IMediaStatus) => {
          const status = mediaStatus?.status;
          return (
            <StatusTag
              active={status!}
              activeLabel="Đang phát"
              inactiveLabel="Đang nghỉ"
            />
          );
        },
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (_: string, record: IDevice) => renderAction(record),
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
      title="Thiết bị cấp Tỉnh/TP"
      permission="DeviceManager"
      buttonMenu={
        currentUser?.userInfo?.region?.levelId === PROVINCE_ID && (
          <div className="flex flex-row phone:flex-col tablet:flex-row gap-2 items-end w-full phone:w-auto">
            <CSVLink
              data={CSVData}
              filename="danh-sach-thiet-bi.csv"
              className="w-full phone:w-auto"
            >
              <TopButton>Xuất báo cáo</TopButton>
            </CSVLink>
            <RestartDialog
              ButtonMenu={
                <TopButton variant="danger" className="w-full">
                  Khởi động lại
                </TopButton>
              }
            />
          </div>
        )
      }
    >
      {currentUser?.userInfo?.region?.levelId === PROVINCE_ID ? (
        <>
          <SearchBoxWrapper>
            <SearchBoxTable
              onFetchData={handleFetchData}
              placeholder="Tìm kiếm theo tên thiết bị"
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
        </>
      ) : (
        <div className="h-30 flex items-center justify-center font-bold text-20">
          Bạn không có quyền truy cập trang này
        </div>
      )}
    </TableLayout>
  );
};

export default ProvinceDevice;
