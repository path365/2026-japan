import Link from "next/link";

interface DayCardProps {
  day: number;
  date: string;
  title: string;
  icon: string;
  theme: string;
}

const themeColors: Record<string, string> = {
  arrival: "from-blue-500 to-cyan-400",
  snow: "from-sky-400 to-blue-300",
  nature: "from-emerald-500 to-teal-400",
  city: "from-purple-500 to-pink-400",
  fun: "from-orange-400 to-yellow-400",
  departure: "from-rose-400 to-pink-400",
};

export default function DayCard({ day, date, title, icon, theme }: DayCardProps) {
  const gradient = themeColors[theme] || "from-gray-500 to-gray-400";

  return (
    <Link href={`/schedule/${day}`}>
      <div
        className={`bg-gradient-to-br ${gradient} rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-4xl">{icon}</span>
          <span className="text-sm opacity-90 bg-white/20 px-3 py-1 rounded-full">
            {date}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-1">Day {day}</h3>
        <p className="text-sm opacity-90">{title}</p>
      </div>
    </Link>
  );
}
