"use client";

import { useState, useCallback, Fragment } from "react";
import dynamic from "next/dynamic";
import ScheduleItem from "@/components/ScheduleItem";
import TransportOptions from "@/components/TransportOptions";

// 動態載入地圖元件 (避免 SSR 問題)
const TripMap = dynamic(() => import("@/components/TripMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
      <div className="text-gray-500">載入地圖中...</div>
    </div>
  ),
});

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface ScheduleItemData {
  time: string;
  title: string;
  description: string;
  details: string[];
  type?: string;
  link?: { text: string; url: string };
  image?: string;
  imageCaption?: string;
  mapUrl?: string;
  location?: Location;
}

interface DayScheduleClientProps {
  items: ScheduleItemData[];
}

export default function DayScheduleClient({ items }: DayScheduleClientProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 過濾出有座標的景點
  const locationsWithIndex = items
    .map((item, idx) => ({
      index: idx,
      location: item.location,
    }))
    .filter((item) => item.location);

  // 建立原始索引到有座標景點索引的映射
  const indexToLocationIndex = new Map<number, number>();
  locationsWithIndex.forEach((item, locIdx) => {
    indexToLocationIndex.set(item.index, locIdx);
  });

  // 提取座標陣列
  const locations = locationsWithIndex
    .map((item) => item.location)
    .filter((loc): loc is Location => !!loc);

  // 當地圖標記被點擊時
  const handleMarkerClick = useCallback((locIdx: number) => {
    const originalIdx = locationsWithIndex[locIdx]?.index;
    if (originalIdx !== undefined) {
      setSelectedIndex(originalIdx);
    }
  }, [locationsWithIndex]);

  // 當行程項目被點擊時
  const handleItemClick = useCallback((originalIdx: number) => {
    setSelectedIndex(originalIdx);
  }, []);

  // 獲取在地圖中選中的索引
  const selectedLocationIndex = selectedIndex !== null
    ? indexToLocationIndex.get(selectedIndex) ?? null
    : null;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* 地圖區塊 - 桌面版在左側，手機版在上方 */}
      <div className="lg:sticky lg:top-24 lg:self-start w-full lg:w-1/2">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              🗺️ 今日路線圖
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              點擊標記或行程項目可互動
            </p>
          </div>
          <div className="h-[300px] lg:h-[400px]">
            <TripMap
              locations={locations}
              selectedIndex={selectedLocationIndex}
              onMarkerClick={handleMarkerClick}
            />
          </div>
        </div>
      </div>

      {/* 行程列表區塊 */}
      <div className="w-full lg:w-1/2">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            📍 詳細行程
          </h2>
          <div className="space-y-0">
            {items.map((item, idx) => {
              const hasLocation = !!item.location;
              const locationIdx = indexToLocationIndex.get(idx);
              
              // 檢查是否需要顯示交通選項 (當前和下一個景點都有座標)
              const nextItem = items[idx + 1];
              const showTransport = 
                hasLocation && 
                nextItem?.location && 
                item.location &&
                // 只有當座標不同時才顯示交通選項
                (item.location.lat !== nextItem.location.lat || 
                 item.location.lng !== nextItem.location.lng);
              
              return (
                <Fragment key={idx}>
                  <ScheduleItem
                    time={item.time}
                    title={item.title}
                    description={item.description}
                    details={item.details}
                    type={item.type}
                    link={item.link}
                    image={item.image}
                    imageCaption={item.imageCaption}
                    index={locationIdx}
                    isSelected={selectedIndex === idx}
                    onItemClick={() => handleItemClick(idx)}
                    hasLocation={hasLocation}
                  />
                  {showTransport && item.location && nextItem.location && (
                    <TransportOptions
                      fromLocation={item.location}
                      toLocation={nextItem.location}
                      fromName={item.location.name}
                      toName={nextItem.location.name}
                    />
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
