import React, { useCallback, useState } from "react";
import L from "leaflet";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { isIOS, osVersion } from "react-device-detect";

import {
  EMERGENCY_PLAYING_ID,
  EMERGENCY_STOPPED_ID,
  ERROR_ID,
  IDLE_ID,
  SCHEDULED_PLAYING_ID,
} from "common/constants/device";

import ScheduledPlayingIcon from "assets/svg/device/scheduled-playing.svg";
import EmergencyPlayingIcon from "assets/svg/device/emergency-playing.svg";
import EmergencyStoppedIcon from "assets/svg/device/emergency-stopped.svg";
import IdleIcon from "assets/svg/device/idle.svg";
import ErrorIcon from "assets/svg/device/error.svg";

import {
  AddressItem,
  AddressList,
  AddressTitle,
  AddressContent,
  Link,
  Button,
  Text,
} from "./styles";

interface IMapMarkerProps {
  lat: number;
  long: number;
  deviceName: string;
  deviceStatus: string;
  deviceAddress: string;
  status: number;
}

const MapMarker: React.FC<IMapMarkerProps> = props => {
  const [zoomScale, setZoomScale] = useState<number>(useMap().getZoom());

  const map = useMapEvents({
    zoom() {
      setZoomScale(map.getZoom());
    },
  });
  const { lat, long, deviceName, deviceStatus, deviceAddress, status } = props;

  const getIcon = useCallback(
    (status: number) => {
      return L.icon({
        iconUrl: (() => {
          switch (status) {
            case IDLE_ID:
              return IdleIcon;
            case SCHEDULED_PLAYING_ID:
              return ScheduledPlayingIcon;
            case ERROR_ID:
              return ErrorIcon;
            case EMERGENCY_PLAYING_ID:
              return EmergencyPlayingIcon;
            case EMERGENCY_STOPPED_ID:
              return EmergencyStoppedIcon;
            default:
              return IdleIcon;
          }
        })(),
        iconSize: [
          zoomScale ? 3 * zoomScale : 3,
          zoomScale ? 2.5 * zoomScale : 2.5,
        ],
      });
    },
    [status, zoomScale],
  );

  return (
    <Marker position={[lat, long]} icon={getIcon(status)}>
      <Popup>
        <AddressList>
          <AddressItem>
            <AddressTitle>Tên thiết bị: </AddressTitle>
            <AddressContent>{deviceName}</AddressContent>
          </AddressItem>
          <AddressItem>
            <AddressTitle>Trạng thái: </AddressTitle>
            <AddressContent>{deviceStatus}</AddressContent>
          </AddressItem>
          <AddressItem>
            <AddressTitle>Vị trí: </AddressTitle>
            <AddressContent>{deviceAddress}</AddressContent>
          </AddressItem>
        </AddressList>
        <Button>
          <Link
            href={`${
              isIOS && +osVersion >= 6
                ? `http://maps.apple.com/?ll=${lat},${long}`
                : `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`
            }`}
            target="_blank"
          >
            <Text>Chỉ đường</Text>
          </Link>
        </Button>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
