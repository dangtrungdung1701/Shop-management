import React, { useEffect, useState } from "react";
import { useBreadcrumb } from "hooks/useBreadcrumb";
import { PATH } from "common/constants/routes";
import { MapContainer, TileLayer } from "react-leaflet";
import { Title } from "./styles";
import MapMarker from "./Marker";
import axiosClient from "common/utils/api";
import { useLoading } from "hooks/useLoading";
import { IDevice } from "typings";
import { ACTIVE_ID, INACTIVE_ID } from "common/constants/device";
import MyLocationMaker from "./MyLocationMaker";

interface IPosition {
  lat: number;
  long: number;
}

const LOAD_DATA = "LOAD_DATA";

const Map: React.FC = () => {
  const [listDevice, setListDevice] = useState<IDevice[]>([]);
  const [positon, setPosion] = useState<IPosition>({
    lat: 10.823099,
    long: 106.629662,
  });

  const { startLoading, stopLoading } = useLoading();

  useBreadcrumb([
    {
      name: "Bản đồ thiết bị",
      href: PATH.MAP,
    },
  ]);

  useEffect(() => {
    getAllDistrictDevices();
  }, []);

  const getAllDistrictDevices = async () => {
    try {
      startLoading(LOAD_DATA);
      const payload: any = {
        regionId: 0,
        excludeRegionId: 1,
      };
      const response: any = await axiosClient.get("/Device", {
        params: payload,
      });
      if (response) {
        setListDevice(response.devices);
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading(LOAD_DATA);
    }
  };

  const getDeviceStatus = (statusId: number) => {
    if (statusId === ACTIVE_ID) {
      return "Đang phát";
    }
    if (statusId === INACTIVE_ID) {
      return "Đang nghỉ";
    }
    return "Bị lỗi";
  };

  return (
    <>
      <Title>Bản đồ thiết bị</Title>
      <MapContainer
        className="w-full h-60 z-10"
        center={[positon.lat, positon.long]}
        scrollWheelZoom
        zoom={10}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyLocationMaker />
        {listDevice.map(device => {
          return (
            <MapMarker
              lat={device?.location?.latitude!}
              long={device?.location?.longitude!}
              deviceName={device?.displayName!}
              deviceStatus={getDeviceStatus(device?.mediaStatus?.status!)}
              deviceAddress={device?.location?.locationDescription!}
              status={device?.mediaStatus?.status!}
            />
          );
        })}
      </MapContainer>
    </>
  );
};

export default Map;
