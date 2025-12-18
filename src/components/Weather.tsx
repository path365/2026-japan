"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  location: string;
  tempMin: number;
  tempMax: number;
  icon: string;
  description: string;
}

interface OpenMeteoResponse {
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
}

// 天氣代碼對應圖示和描述
const weatherCodeMap: Record<number, { icon: string; description: string }> = {
  0: { icon: "☀️", description: "晴天" },
  1: { icon: "🌤️", description: "大致晴朗" },
  2: { icon: "⛅", description: "多雲" },
  3: { icon: "☁️", description: "陰天" },
  45: { icon: "🌫️", description: "霧" },
  48: { icon: "🌫️", description: "霧凇" },
  51: { icon: "🌧️", description: "小毛雨" },
  53: { icon: "🌧️", description: "毛雨" },
  55: { icon: "🌧️", description: "濃毛雨" },
  56: { icon: "🌧️", description: "凍毛雨" },
  57: { icon: "🌧️", description: "濃凍毛雨" },
  61: { icon: "🌧️", description: "小雨" },
  63: { icon: "🌧️", description: "中雨" },
  65: { icon: "🌧️", description: "大雨" },
  66: { icon: "🌨️", description: "凍雨" },
  67: { icon: "🌨️", description: "大凍雨" },
  71: { icon: "🌨️", description: "小雪" },
  73: { icon: "🌨️", description: "中雪" },
  75: { icon: "❄️", description: "大雪" },
  77: { icon: "❄️", description: "雪粒" },
  80: { icon: "🌧️", description: "陣雨" },
  81: { icon: "🌧️", description: "中陣雨" },
  82: { icon: "🌧️", description: "大陣雨" },
  85: { icon: "🌨️", description: "小陣雪" },
  86: { icon: "❄️", description: "大陣雪" },
  95: { icon: "⛈️", description: "雷雨" },
  96: { icon: "⛈️", description: "雷雨夾冰雹" },
  99: { icon: "⛈️", description: "大雷雨夾冰雹" },
};

const locations = [
  { name: "東京", lat: 35.6762, lon: 139.6503 },
  { name: "輕井澤", lat: 36.3482, lon: 138.597 },
];

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const results: WeatherData[] = [];

        for (const loc of locations) {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Asia/Tokyo&forecast_days=1`
          );

          if (!response.ok) throw new Error("API error");

          const data: OpenMeteoResponse = await response.json();

          const weatherCode = data.daily.weather_code[0];
          const weatherInfo = weatherCodeMap[weatherCode] || {
            icon: "🌡️",
            description: "未知",
          };

          results.push({
            location: loc.name,
            tempMin: Math.round(data.daily.temperature_2m_min[0]),
            tempMax: Math.round(data.daily.temperature_2m_max[0]),
            icon: weatherInfo.icon,
            description: weatherInfo.description,
          });
        }

        setWeatherData(results);
        setLoading(false);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-wrap justify-around gap-4">
        <div className="text-center animate-pulse">
          <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-2"></div>
          <div className="w-12 h-4 bg-gray-200 rounded mx-auto mb-1"></div>
          <div className="w-16 h-5 bg-gray-200 rounded mx-auto"></div>
        </div>
        <div className="text-center animate-pulse">
          <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-2"></div>
          <div className="w-12 h-4 bg-gray-200 rounded mx-auto mb-1"></div>
          <div className="w-16 h-5 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    // 錯誤時顯示靜態預估資料
    return (
      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-wrap justify-around gap-4">
        <div className="text-center">
          <span className="text-2xl">🌡️</span>
          <p className="text-sm text-gray-600">東京</p>
          <p className="font-bold text-gray-800">3°C ~ 10°C</p>
          <p className="text-xs text-gray-400">預估</p>
        </div>
        <div className="text-center">
          <span className="text-2xl">❄️</span>
          <p className="text-sm text-gray-600">輕井澤</p>
          <p className="font-bold text-gray-800">-6°C ~ 2°C</p>
          <p className="text-xs text-gray-400">預估</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-wrap justify-around gap-4">
      {weatherData.map((weather) => (
        <div key={weather.location} className="text-center">
          <span className="text-2xl">{weather.icon}</span>
          <p className="text-sm text-gray-600">{weather.location}</p>
          <p className="font-bold text-gray-800">
            {weather.tempMin}°C ~ {weather.tempMax}°C
          </p>
          <p className="text-xs text-gray-500">{weather.description}</p>
        </div>
      ))}
      <div className="w-full text-center mt-2">
        <p className="text-xs text-gray-400">
          🔄 即時天氣 · 資料來源：Open-Meteo
        </p>
      </div>
    </div>
  );
}
