"use client";

import Navigation from "@/components/Navigation";
import { credentials } from "@/data/tripData";
import { useState } from "react";
import Image from "next/image";

export default function CredentialsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pb-20 md:pt-20">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          🎫 憑證資料
        </h1>
        <p className="text-gray-600 mb-6">入境、飯店、交通相關憑證</p>

        {/* VJW 入境登錄 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            🛂 {credentials.vjw.title}
          </h2>
          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {credentials.vjw.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-pink-400 transition-all"
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img}
                    alt={`VJW ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center">
              點擊圖片可放大查看
            </p>
          </div>
        </section>

        {/* 飯店預訂 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            🏨 飯店預訂確認
          </h2>
          <div className="space-y-4">
            {credentials.hotels.map((hotel, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-800">{hotel.name}</h3>
                </div>
                <div
                  className="relative aspect-[4/3] bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedImage(hotel.image)}
                >
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 新幹線車票 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            🚄 新幹線車票
          </h2>
          
          {/* 去程 */}
          <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                  去程
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {credentials.shinkansen.outbound.date}
                </span>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                預約號碼：{credentials.shinkansen.outbound.bookingNumber}
              </span>
            </div>
            <p className="font-bold text-gray-800 mb-1">
              {credentials.shinkansen.outbound.route}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              {credentials.shinkansen.outbound.passengers}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {credentials.shinkansen.outbound.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-pink-400 transition-all"
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img}
                    alt={`去程車票 ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 回程 */}
          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm bg-rose-100 text-rose-700 px-2 py-1 rounded font-medium">
                  回程
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {credentials.shinkansen.inbound.date}
                </span>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                預約號碼：{credentials.shinkansen.inbound.bookingNumber}
              </span>
            </div>
            <p className="font-bold text-gray-800 mb-1">
              {credentials.shinkansen.inbound.route}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              {credentials.shinkansen.inbound.passengers}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {credentials.shinkansen.inbound.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-pink-400 transition-all"
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img}
                    alt={`回程車票 ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 提示 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
            💡 使用提醒
          </h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 入境時請準備好 VJW QR Code</li>
            <li>• 飯店 Check-in 時出示預訂確認畫面</li>
            <li>• 新幹線車票需在羽田機場領取實體票券</li>
            <li>• 建議將此頁面加入手機書籤方便查看</li>
          </ul>
        </div>
      </div>

      {/* 圖片放大 Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-full max-h-full">
            <button
              className="absolute -top-10 right-0 text-white text-lg hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ✕ 關閉
            </button>
            <Image
              src={selectedImage}
              alt="放大圖片"
              width={800}
              height={1200}
              className="max-h-[85vh] w-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
