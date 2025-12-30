import Navigation from "@/components/Navigation";
import DayScheduleClient from "@/components/DayScheduleClient";
import { dailySchedule } from "@/data/tripData";
import Link from "next/link";
import { notFound } from "next/navigation";

const themeColors: Record<string, string> = {
  arrival: "from-blue-500 to-cyan-400",
  snow: "from-sky-400 to-blue-300",
  nature: "from-emerald-500 to-teal-400",
  city: "from-purple-500 to-pink-400",
  fun: "from-orange-400 to-yellow-400",
  departure: "from-rose-400 to-pink-400",
};

interface PageProps {
  params: Promise<{ day: string }>;
}

export default async function DayDetailPage({ params }: PageProps) {
  const { day: dayParam } = await params;
  const dayNumber = parseInt(dayParam);
  const dayData = dailySchedule.find((d) => d.day === dayNumber);

  if (!dayData) {
    notFound();
  }

  const gradient = themeColors[dayData.theme] || "from-gray-500 to-gray-400";
  const prevDay = dayNumber > 1 ? dayNumber - 1 : null;
  const nextDay = dayNumber < 6 ? dayNumber + 1 : null;

  // 序列化行程項目
  const serializedItems = dayData.items.map((item) => ({
    time: item.time,
    title: item.title,
    description: item.description,
    details: item.details,
    type: item.type,
    link: 'link' in item ? item.link : undefined,
    image: 'image' in item ? item.image : undefined,
    imageCaption: 'imageCaption' in item ? item.imageCaption : undefined,
    mapUrl: item.mapUrl,
    location: 'location' in item ? item.location : undefined,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pb-20 md:pt-20">
      <Navigation />

      {/* Hero */}
      <section
        className={`bg-gradient-to-br ${gradient} text-white py-8 px-4`}
      >
        <div className="max-w-7xl mx-auto">
          <Link
            href="/schedule"
            className="inline-flex items-center gap-1 text-white/80 hover:text-white mb-4 text-sm"
          >
            ← 返回行程總覽
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{dayData.icon}</span>
            <div>
              <p className="text-sm opacity-80">{dayData.date}</p>
              <h1 className="text-2xl font-bold">Day {dayData.day}</h1>
              <p className="text-lg opacity-90">{dayData.title}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule with Map */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <DayScheduleClient items={serializedItems} />

        {/* Navigation */}
        <div className="flex justify-between mt-6 mb-4">
          {prevDay ? (
            <Link
              href={`/schedule/${prevDay}`}
              className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
            >
              ← Day {prevDay}
            </Link>
          ) : (
            <div />
          )}
          {nextDay ? (
            <Link
              href={`/schedule/${nextDay}`}
              className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
            >
              Day {nextDay} →
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Next Day Card */}
        {nextDay && (() => {
          const nextDayData = dailySchedule.find((d) => d.day === nextDay);
          const nextGradient = nextDayData ? (themeColors[nextDayData.theme] || "from-gray-500 to-gray-400") : "from-gray-500 to-gray-400";
          return nextDayData ? (
            <Link href={`/schedule/${nextDay}`} className="block">
              <div className={`bg-gradient-to-br ${nextGradient} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{nextDayData.icon}</span>
                    <div>
                      <p className="text-sm opacity-80">繼續閱讀</p>
                      <h3 className="text-xl font-bold">Day {nextDay} - {nextDayData.title}</h3>
                      <p className="text-sm opacity-90">{nextDayData.date}</p>
                    </div>
                  </div>
                  <div className="text-3xl animate-pulse">→</div>
                </div>
              </div>
            </Link>
          ) : null;
        })()}

        {/* End of Trip */}
        {!nextDay && (
          <div className="bg-gradient-to-br from-pink-500 to-rose-400 rounded-2xl p-6 text-white shadow-lg text-center">
            <span className="text-4xl mb-2 block">🎉</span>
            <h3 className="text-xl font-bold">行程結束！</h3>
            <p className="text-sm opacity-90 mt-1">期待美好的旅程 ✨</p>
            <Link
              href="/schedule"
              className="inline-block mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              返回行程總覽
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { day: "1" },
    { day: "2" },
    { day: "3" },
    { day: "4" },
    { day: "5" },
    { day: "6" },
  ];
}
