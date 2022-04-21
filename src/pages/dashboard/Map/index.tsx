import React, { useState } from "react";
import { useBreadcrumb } from "hooks/useBreadcrumb";
import { PATH } from "common/constants/routes";
import { MapContainer, TileLayer } from "react-leaflet";
import { Title } from "./styles";
import MapMarker from "./Marker";

interface IPosition {
  lat: number;
  long: number;
}

const Map: React.FC = () => {
  const [positon, setPosion] = useState<IPosition>({
    lat: 10.823099,
    long: 106.629662,
  });

  useBreadcrumb([
    {
      name: "Bản đồ thiết bị",
      href: PATH.MAP,
    },
  ]);

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
        <MapMarker
          lat={10.823099}
          long={106.629662}
          deviceName="ABC"
          deviceStatus="Đang nghỉ"
          deviceAddress="ĐH SPKT"
          status={false}
        />
      </MapContainer>
    </>
  );
};

export default Map;
