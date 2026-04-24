'use client'
import { useState } from 'react'
import { LayoutGrid, Calendar, Palette, Plus, ChevronRight, Image as ImageIcon } from 'lucide-react'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('design')

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-lg mx-auto font-sans">
      {/* Лого та Профіль */}
      <div className="flex justify-between items-center mb-12 mt-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="font-black text-xl">N</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">Nedushni</h1>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Admin Console</p>
          </div>
        </div>
      </div>

      {/* Glass Navigation */}
      <nav className="glass-card rounded-[28px] p-1.5 flex gap-1 mb-10">
        {[
          { id: 'games', icon: LayoutGrid, label: 'Ігри' },
          { id: 'events', icon: Calendar, label: 'Івенти' },
          { id: 'design', icon: Palette, label: 'Бренд' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[22px] transition-all duration-500 ${
              activeTab === tab.id 
              ? 'bg-white/10 text-white shadow-inner' 
              : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <tab.icon size={18} />
            <span className="text-sm font-bold">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {activeTab === 'design' && (
          <>
            <section className="space-y-6">
              <div className="flex items-center gap-2 px-2">
                <Palette size={20} className="text-blue-500" />
                <h2 className="text-xl font-bold">Стиль інтерфейсу</h2>
              </div>
              
              <div className="glass-card rounded-4xl p-8 space-y-8">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 block">Акцентний колір</label>
                  <div className="flex items-center gap-4 bg-white/5 p-3 rounded-3xl border border-white/5">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg border-2 border-white/10">
                      <input type="color" defaultValue="#3b82f6" className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer" />
                    </div>
                    <input type="text" placeholder="#3B82F6" className="bg-transparent flex-1 outline-none font-mono text-lg font-medium" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 block">Шрифт заголовків</label>
                  <div className="relative">
                    <select className="w-full input-glass p-5 rounded-3xl outline-none appearance-none font-bold text-lg">
                      <option>Unbounded</option>
                      <option>Inter Tight</option>
                      <option>Montserrat</option>
                    </select>
                    <ChevronRight className="absolute right-5 top-6 rotate-90 opacity-30" />
                  </div>
                </div>
              </div>
            </section>

            <button className="w-full py-6 bg-blue-600 rounded-4xl font-black text-lg shadow-2xl shadow-blue-600/30 active:scale-95 transition-all duration-300">
              ЗБЕРЕГТИ ЗМІНИ
            </button>
          </>
        )}

        {activeTab === 'games' && (
           <div className="glass-card rounded-4xl p-8 flex flex-col items-center py-16">
              <Plus size={48} className="text-gray-700 mb-4" />
              <p className="text-gray-500 font-bold">Додати першу гру в базу</p>
           </div>
        )}

      </div>
    </div>
  )
}
