import Navigation from "@/components/Navigation";
import ScheduleItem from "@/components/ScheduleItem";
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pb-20 md:pt-20">
      <Navigation />

      {/* Hero */}
      <section
        className={`bg-gradient-to-br ${gradient} text-white py-8 px-4`}
      >
        <div className="max-w-4xl mx-auto">
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

      {/* Schedule */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            📍 詳細行程
          </h2>
          <div className="space-y-2">
            {dayData.items.map((item, idx) => (
              <ScheduleItem
                key={idx}
                time={item.time}
                title={item.title}
                description={item.description}
                details={item.details}
                type={item.type}
                link={item.link}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
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
