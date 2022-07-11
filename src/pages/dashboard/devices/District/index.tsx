import React, { useMemo, useState, lazy, useCallback, useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { CSVLink } from "react-csv";

import { PATH } from "common/constants/routes";
import { getQueryFromLocation } from "common/functions";
import axiosClient from "common/utils/api";
import { DISTRICT_ID, PROVINCE_ID } from "common/constants/region";

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

import { IRegion, IDevice, IMediaStatus, IGetAllDevice } from "typings";

import useStore from "zustand/store";

import { TopButton, SearchBoxWrapper } from "./styles";

const RestartDialog = lazy(() => import("../Components/RestartDialog"));

const DeleteDialog = lazy(() => import("../Components/DeleteDialog"));

const VolumeDialog = lazy(() => import("../Components/VolumeDialog"));

const LOAD_DATA = "LOAD_DATA";

interface IRegionDeviceProps extends RouteComponentProps {}

const DistrictDevice: React.FC<IRegionDeviceProps> = ({ location }) => {
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
      name: "Quản lý thiết bị",
      href: "#",
    },
    {
      name: "Cấp Quận/Huyện/Thị Xã",
      href: PATH.DEVICE.DISTRICT,
    },
  ]);

  useEffect(() => {
    getAllDistrictDevices();
    const deviceInterval = setInterval(() => {
      getAllDistrictDevicesWithoutLoadingEffect();
    }, 1500);
    return () => clearInterval(deviceInterval);
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
    getDistrictDeviceReport();
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

  const getDistrictDeviceReport = async () => {
    const payload: IGetAllDevice = {
      page: 0,
      size: 0,
      regionId,
      searchString: searchText,
      excludeRegionId: 1,
      level: DISTRICT_ID,
    };
    const response: any = await axiosClient.get("/Device", {
      params: payload,
    });
    if (response) {
      const exportData = response?.devices?.map((device: IDevice) => {
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
  };

  const getAllDistrictDevicesWithoutLoadingEffect = async () => {
    const payload: IGetAllDevice = {
      page,
      size: sizePerPage,
      regionId,
      searchString: searchText,
      excludeRegionId: 1,
      level: DISTRICT_ID,
    };
    const response: any = await axiosClient.get("/Device", {
      params: payload,
    });
    if (response) {
      setListDevice(response.devices);
      setTotalCount(response.totalCount);
    }
  };

  const getAllDistrictDevices = async () => {
    try {
      startLoading(LOAD_DATA);
      await getAllDistrictDevicesWithoutLoadingEffect();
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
          delete: {
            DialogContent: props => (
              <DeleteDialog
                onSuccess={() => {
                  getAllDistrictDevices();
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
                  getAllDistrictDevicesWithoutLoadingEffect();
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
          return <StatusTag statusId={status || 0} />;
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
      title="Thiết bị cấp Quận/Huyện/Thị Xã"
      buttonMenu={
        currentUser?.userInfo?.region?.levelId <= DISTRICT_ID && (
          <div className="flex flex-row items-end w-full gap-2 phone:flex-col tablet:flex-row phone:w-auto">
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
        <div className="flex items-center justify-center font-bold h-30 text-20">
          Bạn không có quyền truy cập trang này
        </div>
      )}
    </TableLayout>
  );
};

export default DistrictDevice;
