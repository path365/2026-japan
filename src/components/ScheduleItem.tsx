"use client";

import { useRef, useEffect } from "react";

interface ScheduleItemProps {
  time: string;
  title: string;
  description: string;
  details: string[];
  type?: string;
  link?: {
    text: string;
    url: string;
  };
  image?: string;
  imageCaption?: string;
  index?: number;
  isSelected?: boolean;
  onItemClick?: (index: number) => void;
  hasLocation?: boolean;
}

const typeColors: Record<string, string> = {
  food: "bg-orange-100 border-orange-300 text-orange-700",
  transport: "bg-blue-100 border-blue-300 text-blue-700",
  activity: "bg-green-100 border-green-300 text-green-700",
  shopping: "bg-purple-100 border-purple-300 text-purple-700",
};

const typeIcons: Record<string, string> = {
  food: "🍜",
  transport: "🚃",
  activity: "🎯",
  shopping: "🛍️",
};

export default function ScheduleItem({
  time,
  title,
  description,
  details,
  type,
  link,
  image,
  imageCaption,
  index,
  isSelected,
  onItemClick,
  hasLocation,
}: ScheduleItemProps) {
  const typeStyle = type ? typeColors[type] : "bg-gray-50 border-gray-200";
  const itemRef = useRef<HTMLDivElement>(null);

  // 當被選中時捲動到此項目
  useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isSelected]);

  const handleClick = () => {
    if (hasLocation && index !== undefined && onItemClick) {
      onItemClick(index);
    }
  };

  return (
    <div
      ref={itemRef}
      className={`flex gap-4 relative transition-all duration-300 rounded-lg ${
        isSelected
          ? "bg-pink-50 ring-2 ring-pink-300 -mx-2 px-2 py-2"
          : hasLocation
          ? "hover:bg-gray-50 cursor-pointer -mx-2 px-2"
          : ""
      }`}
      onClick={handleClick}
    >
      {/* Number Badge & Timeline */}
      <div className="flex flex-col items-center">
        {hasLocation && index !== undefined ? (
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center z-10 text-sm font-bold text-white transition-all duration-300 ${
              isSelected
                ? "bg-pink-500 scale-110 shadow-lg"
                : "bg-pink-400 hover:bg-pink-500"
            }`}
          >
            {index + 1}
          </div>
        ) : (
          <div className="w-3 h-3 bg-gray-300 rounded-full z-10 mt-2"></div>
        )}
        <div className="w-0.5 bg-pink-200 flex-1 -mt-1"></div>
      </div>

      {/* Content */}
      <div className={`flex-1 pb-6 ${type ? "" : ""}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-pink-600">{time}</span>
          {type && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${typeStyle}`}
            >
              {typeIcons[type]} {type === "food" ? "美食" : type === "transport" ? "交通" : type === "activity" ? "活動" : "購物"}
            </span>
          )}
        </div>
        <h4 className="font-bold text-gray-800 mb-1">{title}</h4>
        {description && (
          <p className="text-sm text-gray-600 mb-2">{description}</p>
        )}
        {details.length > 0 && (
          <ul className="text-sm text-gray-500 space-y-1">
            {details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-pink-400">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
        {link && (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-sm text-pink-600 hover:text-pink-700 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            🔗 {link.text}
          </a>
        )}
        {image && (
          <div className="mt-3">
            <img
              src={image}
              alt={imageCaption || title}
              className="rounded-lg shadow-md max-w-full md:max-w-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={(e) => {
                e.stopPropagation();
                window.open(image, '_blank');
              }}
            />
            {imageCaption && (
              <p className="text-xs text-gray-500 mt-1 italic">{imageCaption}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
