"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface TripMapProps {
  locations: Location[];
  selectedIndex: number | null;
  onMarkerClick?: (index: number) => void;
}

// 建立自訂數字標記圖示
const createNumberedIcon = (number: number, isSelected: boolean) => {
  const size = isSelected ? 36 : 28;
  const bgColor = isSelected ? "#ec4899" : "#f472b6";
  const borderColor = isSelected ? "#be185d" : "#db2777";
  const fontSize = isSelected ? 14 : 12;

  return L.divIcon({
    className: "custom-numbered-marker",
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${bgColor};
        border: 3px solid ${borderColor};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: ${fontSize}px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        transition: all 0.2s ease;
        ${isSelected ? "transform: scale(1.1);" : ""}
      ">${number}</div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

export default function TripMap({
  locations,
  selectedIndex,
  onMarkerClick,
}: TripMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);

  // 初始化地圖
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // 計算地圖中心點
    const validLocations = locations.filter((loc) => loc.lat && loc.lng);
    if (validLocations.length === 0) return;

    const avgLat =
      validLocations.reduce((sum, loc) => sum + loc.lat, 0) /
      validLocations.length;
    const avgLng =
      validLocations.reduce((sum, loc) => sum + loc.lng, 0) /
      validLocations.length;

    // 初始化地圖
    mapRef.current = L.map(mapContainerRef.current, {
      center: [avgLat, avgLng],
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    // 使用 OpenStreetMap 圖層
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapRef.current);

    setIsMapReady(true);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // 更新標記
  useEffect(() => {
    if (!mapRef.current || !isMapReady) return;

    // 清除舊標記
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // 新增標記
    const validLocations = locations.filter((loc) => loc.lat && loc.lng);
    const bounds: [number, number][] = [];

    validLocations.forEach((location, idx) => {
      const isSelected = selectedIndex === idx;
      const marker = L.marker([location.lat, location.lng], {
        icon: createNumberedIcon(idx + 1, isSelected),
      });

      marker.bindPopup(
        `<div style="font-weight: 600; font-size: 14px;">${idx + 1}. ${location.name}</div>`,
        { closeButton: false }
      );

      marker.on("click", () => {
        onMarkerClick?.(idx);
      });

      marker.addTo(mapRef.current!);
      markersRef.current.push(marker);
      bounds.push([location.lat, location.lng]);
    });

    // 調整地圖視野以包含所有標記
    if (bounds.length > 0) {
      mapRef.current.fitBounds(bounds, { padding: [30, 30] });
    }

    // 繪製路線
    if (bounds.length > 1) {
      const polyline = L.polyline(bounds, {
        color: "#ec4899",
        weight: 3,
        opacity: 0.6,
        dashArray: "10, 10",
      }).addTo(mapRef.current);
      
      // 將 polyline 存入標記陣列以便清除
      markersRef.current.push(polyline as unknown as L.Marker);
    }
  }, [locations, isMapReady, onMarkerClick]);

  // 當選中的標記改變時更新樣式和地圖中心
  useEffect(() => {
    if (!mapRef.current || !isMapReady) return;

    markersRef.current.forEach((marker, idx) => {
      if (marker instanceof L.Marker) {
        const isSelected = selectedIndex === idx;
        marker.setIcon(createNumberedIcon(idx + 1, isSelected));

        if (isSelected) {
          const latlng = marker.getLatLng();
          mapRef.current?.setView(latlng, mapRef.current.getZoom(), {
            animate: true,
          });
          marker.openPopup();
        }
      }
    });
  }, [selectedIndex, isMapReady]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full rounded-xl" />
      {!isMapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
          <div className="text-gray-500">載入地圖中...</div>
        </div>
      )}
    </div>
  );
}
