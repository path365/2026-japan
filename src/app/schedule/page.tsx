import Navigation from "@/components/Navigation";
import DayCard from "@/components/DayCard";
import { dailySchedule } from "@/data/tripData";
import Link from "next/link";

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pb-20 md:pt-20">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          📅 每日行程總覽
        </h1>
        <p className="text-gray-600 mb-6">點擊卡片查看詳細行程</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* Schedule Summary */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">行程摘要</h2>
          <div className="space-y-3">
            {dailySchedule.map((day) => (
              <Link
                key={day.day}
                href={`/schedule/${day.day}`}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer group"
              >
                <span className="text-2xl">{day.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-pink-600">
                      Day {day.day}
                    </span>
                    <span className="text-xs text-gray-500">{day.date}</span>
                  </div>
                  <p className="text-gray-800 font-medium">{day.title}</p>
                </div>
                <span className="text-pink-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
