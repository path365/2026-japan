import Navigation from "@/components/Navigation";
import Countdown from "@/components/Countdown";
import DayCard from "@/components/DayCard";
import { tripInfo, flights, dailySchedule } from "@/data/tripData";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pb-20 md:pt-20">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 text-white py-12 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">🇯🇵</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{tripInfo.title}</h1>
          <p className="text-lg opacity-90 mb-2">{tripInfo.subtitle}</p>
          <p className="text-sm opacity-80 mb-6">
            👨‍👩‍👧‍👦 {tripInfo.travelers}
          </p>

          {/* Countdown */}
          <div className="mb-6">
            <p className="text-sm opacity-80 mb-3">距離出發還有</p>
            <Countdown targetDate={tripInfo.dates.start} />
          </div>

          {/* Date Badge */}
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
            📅 {tripInfo.dates.display}
          </div>
        </div>
      </section>

      {/* Weather Info */}
      <section className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-wrap justify-around gap-4">
          <div className="text-center">
            <span className="text-2xl">🌡️</span>
            <p className="text-sm text-gray-600">東京</p>
            <p className="font-bold text-gray-800">{tripInfo.weather.tokyo}</p>
          </div>
          <div className="text-center">
            <span className="text-2xl">❄️</span>
            <p className="text-sm text-gray-600">輕井澤</p>
            <p className="font-bold text-gray-800">{tripInfo.weather.karuizawa}</p>
          </div>
        </div>
      </section>

      {/* Flight Info */}
      <section className="max-w-4xl mx-auto px-4 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          ✈️ 航班資訊
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">去程</span>
              <span className="text-sm text-gray-500">{flights.departure.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="text-lg font-bold">{flights.departure.time}</p>
                <p className="text-xs text-gray-500">TSA</p>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                <span>✈️</span>
                <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{flights.departure.arrival}</p>
                <p className="text-xs text-gray-500">HND</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-rose-500">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm bg-rose-100 text-rose-700 px-2 py-1 rounded">回程</span>
              <span className="text-sm text-gray-500">{flights.return.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="text-lg font-bold">{flights.return.time}</p>
                <p className="text-xs text-gray-500">HND</p>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                <span>✈️</span>
                <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{flights.return.arrival}</p>
                <p className="text-xs text-gray-500">TSA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="max-w-4xl mx-auto px-4 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          🗓️ 每日行程
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {dailySchedule.map((day) => (
            <DayCard
              key={day.day}
              day={day.day}
              date={day.date}
              title={day.title}
              icon={day.icon}
              theme={day.theme}
            />
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-4xl mx-auto px-4 mt-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          �� 快速連結
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <a
            href="https://keikyubus.travel.navitime.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-shadow"
          >
            <span className="text-2xl">🚌</span>
            <p className="text-sm font-medium text-gray-700 mt-1">機場巴士</p>
          </a>
          <a
            href="https://japanportal.donki-global.com/coupon/cp001_zhtw.html"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-shadow"
          >
            <span className="text-2xl">🎫</span>
            <p className="text-sm font-medium text-gray-700 mt-1">唐吉訶德優惠</p>
          </a>
          <a
            href="https://www.jnto.go.jp/emergency/chc/do_travel_insurance05.html"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-shadow"
          >
            <span className="text-2xl">🏥</span>
            <p className="text-sm font-medium text-gray-700 mt-1">旅遊保險</p>
          </a>
          <a
            href="https://pse.is/8ewfv5"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-shadow"
          >
            <span className="text-2xl">🍜</span>
            <p className="text-sm font-medium text-gray-700 mt-1">輕井澤美食</p>
          </a>
        </div>
      </section>
    </div>
  );
}
