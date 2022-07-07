import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import { PATH } from "common/constants/routes";
import axiosClient from "common/utils/api";
import {
  EMERGENCY_PLAYING_ID,
  EMERGENCY_STOPPED_ID,
  ERROR_ID,
  IDLE_ID,
  SCHEDULED_PLAYING_ID,
  STATUS,
} from "common/constants/device";

import { useLoading } from "hooks/useLoading";
import { useBreadcrumb } from "hooks/useBreadcrumb";

import { IDevice } from "typings";

import useStore from "zustand/store";

import MyLocationMaker from "./MyLocationMaker";
import { Title } from "./styles";
import MapMarker from "./Marker";

interface IPosition {
  lat: number;
  long: number;
}

const LOAD_DATA = "LOAD_DATA";

const Map: React.FC = () => {
  const { currentUser } = useStore();
  const [listDevice, setListDevice] = useState<IDevice[]>([]);
  const [position, setPosition] = useState<IPosition>({
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
        regionId: currentUser?.userInfo?.region?.id,
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

  const getStatusFromStatusId = (statusId: number) => {
    switch (statusId) {
      case IDLE_ID:
        return {
          activeType: STATUS[IDLE_ID].activeType,
          label: STATUS[IDLE_ID].label,
        };
      case SCHEDULED_PLAYING_ID:
        return {
          activeType: STATUS[SCHEDULED_PLAYING_ID].activeType,

          label: STATUS[SCHEDULED_PLAYING_ID].label,
        };
      case ERROR_ID:
        return {
          activeType: STATUS[ERROR_ID].activeType,

          label: STATUS[ERROR_ID].label,
        };
      case EMERGENCY_PLAYING_ID:
        return {
          activeType: STATUS[EMERGENCY_PLAYING_ID].activeType,

          label: STATUS[EMERGENCY_PLAYING_ID].label,
        };
      case EMERGENCY_STOPPED_ID:
        return {
          activeType: STATUS[EMERGENCY_STOPPED_ID].activeType,

          label: STATUS[EMERGENCY_STOPPED_ID].label,
        };

      default:
        return {
          activeType: STATUS[IDLE_ID].activeType,
          label: STATUS[0].label,
        };
    }
  };

  return (
    <>
      <Title>Bản đồ thiết bị</Title>
      <MapContainer
        className="w-full h-60 z-10"
        center={[position.lat, position.long]}
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
              deviceStatus={
                getStatusFromStatusId(device?.mediaStatus?.status!).label
              }
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
