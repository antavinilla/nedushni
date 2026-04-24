'use client'
import { useState } from 'react'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('games')

  return (
    <div className="p-5 pb-20">
      <h1 className="text-3xl font-black mb-6 tracking-tight">Адмінка</h1>

      {/* Навігація */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <button onClick={() => setActiveTab('games')} className={`px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${activeTab === 'games' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-100 dark:bg-gray-800'}`}>Каталог</button>
        <button onClick={() => setActiveTab('events')} className={`px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${activeTab === 'events' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-100 dark:bg-gray-800'}`}>Ігросесії</button>
        <button onClick={() => setActiveTab('design')} className={`px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${activeTab === 'design' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-100 dark:bg-gray-800'}`}>Візуал</button>
      </div>

      {/* Каталог */}
      {activeTab === 'games' && (
        <div className="space-y-5">
          <h2 className="text-xl font-bold">Нова гра</h2>
          <input type="text" placeholder="Назва гри" className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none" />
          <div className="flex gap-4">
            <input type="number" placeholder="Мін. гравців" className="w-1/2 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none" />
            <input type="number" placeholder="Макс. гравців" className="w-1/2 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none" />
          </div>
          <input type="text" placeholder="URL обкладинки" className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none" />
          <button className="w-full bg-[var(--accent-color)] text-white p-4 rounded-2xl font-bold text-lg">Зберегти в базу</button>
        </div>
      )}

      {/* Візуал */}
      {activeTab === 'design' && (
        <div className="space-y-5">
          <h2 className="text-xl font-bold">Налаштування бренду</h2>
          <input type="text" placeholder="URL логотипу" className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none" />
          <div className="flex gap-3 items-center">
            <input type="color" defaultValue="#ff4500" className="w-14 h-14 rounded-xl cursor-pointer p-0 border-0 bg-transparent" />
            <input type="text" placeholder="#ff4500 (Акцентний колір)" className="flex-1 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none" />
          </div>
          <button className="w-full bg-black dark:bg-white text-white dark:text-black p-4 rounded-2xl font-bold text-lg">Оновити дизайн</button>
        </div>
      )}
    </div>
  )
}
