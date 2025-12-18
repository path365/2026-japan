"use client";

import Navigation from "@/components/Navigation";
import { checklist as initialChecklist } from "@/data/tripData";
import { useState, useEffect } from "react";

interface ChecklistItem {
  id: number;
  category: string;
  item: string;
  checked: boolean;
}

export default function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>(initialChecklist);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("trip-checklist");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  const toggleItem = (id: number) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updated);
    localStorage.setItem("trip-checklist", JSON.stringify(updated));
  };

  const categories = [...new Set(items.map((item) => item.category))];
  const completedCount = items.filter((item) => item.checked).length;
  const progress = Math.round((completedCount / items.length) * 100);

  const categoryIcons: Record<string, string> = {
    證件: "🪪",
    金融: "💳",
    交通: "🚃",
    衣物: "👕",
    備品: "🧴",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pb-20 md:pt-20">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          ✅ 行前打包清單
        </h1>
        <p className="text-gray-600 mb-6">出發前確認所有必需品</p>

        {/* Progress */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">準備進度</span>
            <span className="text-sm font-bold text-pink-600">
              {mounted ? `${completedCount}/${items.length}` : "--/--"}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-pink-500 to-rose-400 h-3 rounded-full transition-all duration-300"
              style={{ width: mounted ? `${progress}%` : "0%" }}
            ></div>
          </div>
          {mounted && progress === 100 && (
            <p className="text-center text-green-600 font-medium mt-2">
              🎉 太棒了！準備完成！
            </p>
          )}
        </div>

        {/* Checklist by Category */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category} className="bg-white rounded-2xl shadow-md p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span>{categoryIcons[category] || "📦"}</span>
                {category}
              </h2>
              <div className="space-y-2">
                {items
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        item.checked
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(item.id)}
                        className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      />
                      <span
                        className={item.checked ? "line-through opacity-70" : ""}
                      >
                        {item.item}
                      </span>
                      {item.checked && (
                        <span className="ml-auto text-green-500">✓</span>
                      )}
                    </label>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Reset Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setItems(initialChecklist);
              localStorage.removeItem("trip-checklist");
            }}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            重置清單
          </button>
        </div>
      </div>
    </div>
  );
}
