"use client";

import Navigation from "@/components/Navigation";
import { checklist as defaultChecklist } from "@/data/tripData";
import { useState, useEffect } from "react";

interface ChecklistItem {
  id: number;
  category: string;
  item: string;
  checked: boolean;
  isCustom?: boolean; // 標記是否為自訂項目
}

const categoryIcons: Record<string, string> = {
  證件: "🪪",
  金融: "💳",
  交通: "🚃",
  衣物: "👕",
  備品: "🧴",
  自訂: "📝",
};

const categoryOptions = ["證件", "金融", "交通", "衣物", "備品", "自訂"];

export default function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newCategory, setNewCategory] = useState("自訂");

  // 從 localStorage 載入資料
  useEffect(() => {
    setMounted(true);
    const savedItems = localStorage.getItem("trip-checklist-items");
    const savedChecked = localStorage.getItem("trip-checklist-checked");

    if (savedItems) {
      // 有完整儲存的項目列表
      setItems(JSON.parse(savedItems));
    } else if (savedChecked) {
      // 舊版：只有勾選狀態，需要合併
      const checkedState = JSON.parse(savedChecked);
      const merged = defaultChecklist.map((item) => ({
        ...item,
        checked: checkedState[item.id] || false,
        isCustom: false,
      }));
      setItems(merged);
    } else {
      // 全新：使用預設清單
      setItems(
        defaultChecklist.map((item) => ({
          ...item,
          isCustom: false,
        }))
      );
    }
  }, []);

  // 儲存到 localStorage
  const saveItems = (updatedItems: ChecklistItem[]) => {
    setItems(updatedItems);
    localStorage.setItem("trip-checklist-items", JSON.stringify(updatedItems));
  };

  // 切換勾選狀態
  const toggleItem = (id: number) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    saveItems(updated);
  };

  // 新增項目
  const addItem = () => {
    if (!newItem.trim()) return;

    const maxId = items.reduce((max, item) => Math.max(max, item.id), 0);
    const newChecklistItem: ChecklistItem = {
      id: maxId + 1,
      category: newCategory,
      item: newItem.trim(),
      checked: false,
      isCustom: true,
    };

    saveItems([...items, newChecklistItem]);
    setNewItem("");
    setShowAddForm(false);
  };

  // 刪除自訂項目
  const deleteItem = (id: number) => {
    const updated = items.filter((item) => item.id !== id);
    saveItems(updated);
  };

  // 重置清單 (保留自訂項目，只重置勾選狀態)
  const resetChecklist = () => {
    const reset = items.map((item) => ({ ...item, checked: false }));
    saveItems(reset);
  };

  // 完全重置 (恢復預設，刪除所有自訂項目)
  const fullReset = () => {
    if (confirm("確定要完全重置嗎？這將刪除所有自訂項目！")) {
      const defaultItems = defaultChecklist.map((item) => ({
        ...item,
        isCustom: false,
      }));
      setItems(defaultItems);
      localStorage.removeItem("trip-checklist-items");
      localStorage.removeItem("trip-checklist-checked");
    }
  };

  const categories = [...new Set(items.map((item) => item.category))];
  const completedCount = items.filter((item) => item.checked).length;
  const progress = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

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

        {/* Add Item Button */}
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full mb-4 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-xl font-medium hover:from-pink-600 hover:to-rose-500 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <span className="text-xl">+</span> 新增項目
          </button>
        )}

        {/* Add Item Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              ➕ 新增清單項目
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">分類</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {categoryIcons[cat]} {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">項目名稱</label>
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addItem()}
                  placeholder="例如：充電器、藥品..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addItem}
                  disabled={!newItem.trim()}
                  className="flex-1 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  新增
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewItem("");
                  }}
                  className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

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
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        item.checked
                          ? "bg-green-50"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <label className="flex items-center gap-3 flex-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleItem(item.id)}
                          className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                        />
                        <span
                          className={`${
                            item.checked
                              ? "line-through opacity-70 text-green-700"
                              : "text-gray-800"
                          }`}
                        >
                          {item.item}
                        </span>
                        {item.isCustom && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                            自訂
                          </span>
                        )}
                      </label>
                      {item.checked && (
                        <span className="text-green-500">✓</span>
                      )}
                      {item.isCustom && (
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="text-red-400 hover:text-red-600 p-1"
                          title="刪除此項目"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Reset Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={resetChecklist}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            重置勾選狀態
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={fullReset}
            className="text-sm text-red-400 hover:text-red-600 underline"
          >
            完全重置
          </button>
        </div>

        {/* Info */}
        <p className="text-center text-xs text-gray-400 mt-4">
          💡 清單資料會自動儲存在您的瀏覽器中
        </p>
      </div>
    </div>
  );
}
