import React, { useCallback, useState } from "react";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";

import CurrentLocationIcon from "assets/svg/device/current-location.svg";

const MyLocationMaker = () => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [zoomScale, setZoomScale] = useState<number>(useMap().getZoom());

  const map = useMapEvents({
    zoom() {
      setZoomScale(map.getZoom());
    },
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const getIcon = useCallback(() => {
    return L.icon({
      iconUrl: CurrentLocationIcon,
      iconSize: [zoomScale ? 4 * zoomScale : 4, zoomScale ? 3 * zoomScale : 3],
    });
  }, [zoomScale]);

  return position === null ? null : (
    <Marker position={position} icon={getIcon()}>
      <Popup>Bạn đang ở đây</Popup>
    </Marker>
  );
};

export default MyLocationMaker;
