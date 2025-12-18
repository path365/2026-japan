interface HotelCardProps {
  name: string;
  dates: string;
  transport: string;
  mapUrl: string;
}

export default function HotelCard({
  name,
  dates,
  transport,
  mapUrl,
}: HotelCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-32 bg-gradient-to-br from-pink-400 to-rose-300 flex items-center justify-center">
        <span className="text-6xl">🏨</span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full font-medium">
            {dates}
          </span>
        </div>
        <h3 className="font-bold text-gray-800 mb-2 leading-tight">{name}</h3>
        <p className="text-sm text-gray-600 mb-3">🚃 {transport}</p>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-pink-600 hover:text-pink-700 font-medium"
        >
          📍 查看地圖
        </a>
      </div>
    </div>
  );
}
