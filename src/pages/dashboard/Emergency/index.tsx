import React, { useMemo, useState, lazy, useCallback, useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router";

import { PATH } from "common/constants/routes";
import { getQueryFromLocation } from "common/functions";
import axiosClient from "common/utils/api";
import { DISTRICT_ID, PROVINCE_ID } from "common/constants/region";
import { DATA_ID, ETHERNET_ID, WIFI_ID } from "common/constants/device";

import SearchBoxTable from "components/SearchBoxTable";
import StatusTag from "components/StatusTag";

import Table, { IColumns } from "designs/Table";
import ActionButtons from "designs/ActionButtons";
import SimpleSelect from "designs/SimpleSelect";
import SVG from "designs/SVG";

import TableLayout from "layouts/Table";

import { usePage } from "hooks/usePage";
import { useLoading } from "hooks/useLoading";
import { useBreadcrumb } from "hooks/useBreadcrumb";
import useGetLocation from "hooks/useGetLocation";

import {
  IRegion,
  IDevice,
  IConnectionStatus,
  IMediaStatus,
  IGetAllDevice,
} from "typings";

import useStore from "zustand/store";

import { TopButton, SearchBoxWrapper } from "./styles";

const EmergencyBroadcastDialog = lazy(
  () => import("./Components/EmergencyBroadcastDialog"),
);

const EmergencyPauseDialog = lazy(
  () => import("./Components/EmergencyPauseDialog"),
);

const LOAD_DATA = "LOAD_DATA";

interface IRegionDeviceProps extends RouteComponentProps {}

const Emergency: React.FC<IRegionDeviceProps> = ({ location }) => {
  const { currentUser, setCurrentUser } = useStore();

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");

  const [districtList, setDistrictList] = useState<IRegion[]>([]);
  const [listDevice, setListDevice] = useState<IDevice[]>([]);

  const [districtSelected, setDistrictSelected] = useState<IRegion | null>(
    null,
  );

  const [totalCount, setTotalCount] = useState<number>(listDevice.length);
  const { startLoading, stopLoading } = useLoading();

  const [CSVData, setCSVData] = useState<any[]>([]);

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

  const [regionId, setRegionId] = useState(getDefaultRegionId());

  useBreadcrumb([
    {
      name: "Quản lý khẩn cấp",
      href: "#",
    },
    {
      name: "Khẩn cấp",
      href: PATH.EMERGENCY.SELF,
    },
  ]);

  useEffect(() => {
    getAllDistrictDevices();
  }, [page, sizePerPage, searchText, regionId]);

  useEffect(() => {
    const provinceId: number = currentUser?.userInfo?.region?.provinceId;

    if (districtList.length) {
      const newRegionId = districtSelected ? districtSelected?.id : provinceId;
      setRegionId(newRegionId!);
    }
  }, [districtSelected]);

  useEffect(() => {
    getUserInfoService();
    const provinceId = currentUser?.userInfo?.region?.provinceId;
    getDistrictListService(provinceId);
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

  const getDistrictListService = async (id: number) => {
    try {
      const res: any = await axiosClient.get(`Region/${id}/Subregions`);
      if (res) {
        setDistrictList(res.regions);
        setDistrictSelected(
          useGetLocation(
            currentUser?.userInfo?.region?.districtId!,
            res.regions,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDistrictDevices = async () => {
    const input: IGetAllDevice = {
      page,
      size: sizePerPage,
      regionId,
      searchString: searchText,
      excludeRegionId: 1,
      level: DISTRICT_ID,
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
    return (
      <ActionButtons
        buttons={{
          config: {
            DialogContent: props => (
              <Redirect
                to={{
                  pathname: PATH.DEVICE.EDIT_DEVICE.replace(
                    ":id",
                    record.id!,
                  ).replace(":class", "district"),
                }}
              />
            ),
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
        text: "Kết nối",
        dataField: "connectionStatus",
        formatter: (connectionStatus: IConnectionStatus) => {
          const type = connectionStatus?.connectionType;
          if (type === ETHERNET_ID) return <SVG name="device/ethernet" />;
          if (type === DATA_ID) return <SVG name="device/4g" />;
          if (type === WIFI_ID) return <SVG name="device/wifi" />;
          return <SVG name="device/wifi-off" />;
        },
        headerStyle: () => ({
          width: "18%",
        }),
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
    [page, listDevice],
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
      title="Quản lý lịch phát khẩn cấp"
      permission="EmergencyOperator"
      buttonMenu={
        <div className="flex flex-row phone:flex-col tablet:flex-row gap-2 items-end w-full phone:w-auto">
          <EmergencyBroadcastDialog
            level={DISTRICT_ID}
            ButtonMenu={<TopButton variant="primary">Phát khẩn cấp</TopButton>}
          />
          <EmergencyPauseDialog
            ButtonMenu={
              <TopButton variant="danger" className="w-full">
                Dừng khẩn cấp
              </TopButton>
            }
          />
        </div>
      }
    >
      {currentUser?.userInfo?.region?.levelId <= DISTRICT_ID ? (
        <>
          <SearchBoxWrapper>
            <SearchBoxTable
              onFetchData={handleFetchData}
              placeholder="Tìm kiếm theo tên thiết bị"
              className="w-full phone:max-w-35"
            />
            {currentUser?.userInfo?.region?.levelId === PROVINCE_ID && (
              <SimpleSelect
                options={districtList}
                optionSelected={districtSelected}
                onSelect={value => {
                  setDistrictSelected(value);
                  setPage(1);
                }}
                placeholder="Quận/Huyện/Thị Xã"
                className="w-full phone:max-w-35"
                optionTarget="displayName"
              />
            )}
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

export default Emergency;
