import Navigation from "@/components/Navigation";
import HotelCard from "@/components/HotelCard";
import { hotels } from "@/data/tripData";

export default function HotelsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pb-20 md:pt-20">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          🏨 住宿資訊
        </h1>
        <p className="text-gray-600 mb-6">共 3 間飯店，5 晚住宿</p>

        <div className="grid md:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              name={hotel.name}
              dates={hotel.dates}
              transport={hotel.transport}
              mapUrl={hotel.mapUrl}
            />
          ))}
        </div>

        {/* Timeline View */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">住宿時間軸</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-500">1/11 (日)</div>
              <div className="flex-1 h-8 bg-blue-100 rounded-lg flex items-center px-3">
                <span className="text-sm font-medium text-blue-700">
                  大井町 - Ours Inn Hankyu
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-500">1/12 (一)</div>
              <div className="flex-1 h-8 bg-sky-100 rounded-lg flex items-center px-3">
                <span className="text-sm font-medium text-sky-700">
                  輕井澤 - 王子大飯店 西館
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-500">1/13 (二)</div>
              <div className="flex-1 h-8 bg-sky-100 rounded-lg flex items-center px-3">
                <span className="text-sm font-medium text-sky-700">
                  輕井澤 - 王子大飯店 西館
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-500">1/14 (三)</div>
              <div className="flex-1 h-8 bg-purple-100 rounded-lg flex items-center px-3">
                <span className="text-sm font-medium text-purple-700">
                  押上 - Richmond Hotel
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-500">1/15 (四)</div>
              <div className="flex-1 h-8 bg-purple-100 rounded-lg flex items-center px-3">
                <span className="text-sm font-medium text-purple-700">
                  押上 - Richmond Hotel
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
            💡 住宿小提醒
          </h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 輕井澤飯店需搭乘接駁車，請注意時刻表</li>
            <li>• Richmond Hotel 在押上站 B3 出口直達，非常方便</li>
            <li>• 入住前可先寄放行李，輕裝出門更輕鬆</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
