"use client";

import { useState } from "react";

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface TransportOptionsProps {
  fromLocation: Location;
  toLocation: Location;
  fromName: string;
  toName: string;
}

type TransportMode = "transit" | "walking" | "driving" | "bicycling";

const transportModes: {
  mode: TransportMode;
  icon: string;
  label: string;
  color: string;
  bgColor: string;
}[] = [
  {
    mode: "transit",
    icon: "🚃",
    label: "大眾交通",
    color: "text-blue-600",
    bgColor: "bg-blue-50 hover:bg-blue-100 border-blue-200",
  },
  {
    mode: "walking",
    icon: "🚶",
    label: "步行",
    color: "text-green-600",
    bgColor: "bg-green-50 hover:bg-green-100 border-green-200",
  },
  {
    mode: "driving",
    icon: "🚕",
    label: "計程車",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200",
  },
  {
    mode: "bicycling",
    icon: "🚲",
    label: "腳踏車",
    color: "text-purple-600",
    bgColor: "bg-purple-50 hover:bg-purple-100 border-purple-200",
  },
];

export default function TransportOptions({
  fromLocation,
  toLocation,
  fromName,
  toName,
}: TransportOptionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const openGoogleMaps = (mode: TransportMode) => {
    // Google Maps Directions URL
    // mode: driving, walking, bicycling, transit
    const travelMode = mode === "driving" ? "driving" : mode;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${fromLocation.lat},${fromLocation.lng}&destination=${toLocation.lat},${toLocation.lng}&travelmode=${travelMode}`;
    window.open(url, "_blank");
  };

  // 計算兩點之間的直線距離 (公里)
  const calculateDistance = () => {
    const R = 6371; // 地球半徑 (公里)
    const dLat = ((toLocation.lat - fromLocation.lat) * Math.PI) / 180;
    const dLon = ((toLocation.lng - fromLocation.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((fromLocation.lat * Math.PI) / 180) *
        Math.cos((toLocation.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const distance = calculateDistance();
  const estimatedWalkTime = Math.round((distance / 5) * 60); // 假設步行速度 5km/h

  return (
    <div className="relative ml-3 my-1">
      {/* 連接線 */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-pink-200"></div>

      {/* 交通選擇區塊 */}
      <div className="ml-6 py-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors group"
        >
          <div className="flex items-center gap-1 bg-gray-100 group-hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors">
            <span>🚗</span>
            <span className="font-medium">移動方式</span>
            <span className="text-xs text-gray-400 ml-1">
              ({distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`})
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* 展開的選項 */}
        {isExpanded && (
          <div className="mt-2 p-3 bg-gray-50 rounded-xl border border-gray-100 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-1 mb-2 text-xs text-gray-500">
              <span className="font-medium truncate max-w-[100px]" title={fromName}>
                {fromName}
              </span>
              <span>→</span>
              <span className="font-medium truncate max-w-[100px]" title={toName}>
                {toName}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {transportModes.map(({ mode, icon, label, bgColor }) => (
                <button
                  key={mode}
                  onClick={() => openGoogleMaps(mode)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${bgColor}`}
                >
                  <span className="text-lg">{icon}</span>
                  <span>{label}</span>
                  {mode === "walking" && estimatedWalkTime > 0 && (
                    <span className="text-xs text-gray-400 ml-auto">
                      ~{estimatedWalkTime}分
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* 快速提示 */}
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <span>💡</span>
                <span>點擊後將開啟 Google Maps 導航</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
