import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const getTemperatureColor = (temp) => {
  if (temp <= -30) return "#003366";
  if (temp <= -20) return "#4A90E2";
  if (temp <= -10) return "#B3DFFD";
  if (temp <= 0) return "#E6F7FF";
  if (temp <= 10) return "#D1F2D3";
  if (temp <= 20) return "#FFFACD";
  if (temp <= 30) return "#FFCC80";
  if (temp <= 40) return "#FF7043";
  return "#D32F2F";
};

const getWindSpeedColor = (speed) => {
  if (speed <= 10) return "#E0F7FA";
  if (speed <= 20) return "#B2EBF2";
  if (speed <= 40) return "#4DD0E1";
  if (speed <= 60) return "#0288D1";
  return "#01579B";
};

const getCloudinessColor = (clouds) => {
  if (clouds <= 10) return "#FFF9C4";
  if (clouds <= 30) return "#FFF176";
  if (clouds <= 60) return "#E0E0E0";
  if (clouds <= 90) return "#9E9E9E";
  return "#616161";
};

const defaultPosition = [51.505, -0.09];

function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [selectPosition, map]);

  return null;
}

export default function Maps({ selectPosition, weatherData, weatherType }) {
  const locationSelection = selectPosition
    ? [selectPosition.lat, selectPosition.lon]
    : defaultPosition;

  const [tooltipContent, setTooltipContent] = useState("");
  const [markerColor, setMarkerColor] = useState("#FFFFFF");

  useEffect(() => {
    if (weatherData) {
      let color = "#FFFFFF";
      if (weatherType === "main") {
        const temperature = weatherData.main?.temp;
        color = getTemperatureColor(temperature);
        setTooltipContent(
          `<div><p><strong>Temperature:</strong> ${temperature}°C</p></div>`
        );
      } else if (weatherType === "wind") {
        const windSpeed = weatherData.wind?.speed;
        color = getWindSpeedColor(windSpeed);
        setTooltipContent(
          `<div><p><strong>Wind Speed:</strong> ${windSpeed} m/s</p></div>`
        );
      } else if (weatherType === "clouds") {
        const cloudiness = weatherData.clouds?.all;
        color = getCloudinessColor(cloudiness);
        setTooltipContent(
          `<div><p><strong>Cloudiness:</strong> ${cloudiness}%</p></div>`
        );
      }
      setMarkerColor(color);
    }
  }, [weatherData, weatherType]);

  return (
    <MapContainer
      center={locationSelection}
      zoom={8}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=9ZaaYcBDL7EdnEDlJh4m"
      />

      {selectPosition && (
        <Marker
          position={locationSelection}
          icon={L.divIcon({
            className: "custom-icon",
            html: `<div style="background-color: ${markerColor}; width: 38px; height: 38px; border-radius: 50%;"></div>`,
          })}
        >
          <Tooltip
            permanent
            direction="top"
            opacity={1}
            className="custom-tooltip"
          >
            <div dangerouslySetInnerHTML={{ __html: tooltipContent }} />
          </Tooltip>
        </Marker>
      )}

      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}
