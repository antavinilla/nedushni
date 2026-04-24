'use client'
import { useState, useRef, useEffect } from 'react'
import { LayoutGrid, Palette, Upload, Check, Loader2, ChevronDown, Calendar, Image as ImageIcon } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('brand')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [config, setConfig] = useState({
    accentColor: '#3B82F6',
    fontFamily: 'Unbounded',
    logoUrl: '',
  })

  // Завантаження поточних налаштувань з бази
  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase.from('settings').select('*').eq('key', 'theme').single()
      if (data) setConfig(data.value)
    }
    loadSettings()
  }, [])

  // 1. Логіка завантаження ЛОГО
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    setLoading(true)
    const file = e.target.files[0]
    const fileName = `logo-${Date.now()}.${file.name.split('.').pop()}`

    const { error: uploadError } = await supabase.storage.from('assets').upload(fileName, file)
    if (!uploadError) {
      const { data } = supabase.storage.from('assets').getPublicUrl(fileName)
      setConfig(prev => ({ ...prev, logoUrl: data.publicUrl }))
      setStatus('Лого оновлено')
    } else {
      console.error(uploadError)
      setStatus('Помилка завантаження')
    }
    setLoading(false)
  }

  // 2. Логіка збереження всього бренду
 const saveBrand = async () => {
    setLoading(true)
    const { error } = await supabase
      .from('settings')
      .upsert({ key: 'theme', value: config })
    
    if (!error) {
      setStatus('ЗБЕРЕЖЕНО!')
      // Щоб ти відразу побачив зміни шрифтів та кольорів
      setTimeout(() => window.location.reload(), 1000)
    } else {
      console.error(error)
      setStatus('ПОМИЛКА БАЗИ')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 max-w-lg mx-auto font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="flex items-center gap-4 mb-10 mt-4 px-2">
        <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40">
          <span className="font-black text-xl tracking-tighter">N</span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Nedushni</h1>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Design System</p>
        </div>
      </header>

      {/* Tabs */}
      <nav className="glass-card rounded-[32px] p-1.5 flex gap-1 mb-10 border border-white/5 bg-white/5 backdrop-blur-2xl">
        {[
          { id: 'brand', icon: Palette, label: 'Бренд' },
          { id: 'games', icon: LayoutGrid, label: 'Ігри' },
          { id: 'events', icon: Calendar, label: 'Івенти' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[26px] transition-all duration-500 ${
              activeTab === tab.id ? 'bg-white/10 text-white shadow-inner scale-[1.02]' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <tab.icon size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
        {activeTab === 'brand' && (
          <>
            {/* Visual Assets Card */}
            <section className="glass-card rounded-[40px] p-8 border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/80 mb-6 block">Visual Identity</label>
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className="aspect-video rounded-[32px] border-2 border-dashed border-white/10 hover:border-blue-500/50 transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden bg-black/40 group relative"
               >
                 {config.logoUrl ? (
                   <img src={config.logoUrl} alt="Logo" className="w-full h-full object-contain p-8 animate-in zoom-in-95" />
                 ) : (
                   <div className="text-center">
                     <ImageIcon size={32} className="mx-auto mb-2 opacity-20 group-hover:opacity-100 group-hover:text-blue-500 transition-all" />
                     <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Завантажити LOGO</p>
                   </div>
                 )}
                 {loading && <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm"><Loader2 className="animate-spin" /></div>}
                 <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
               </div>
            </section>

            {/* Styles Card */}
            <section className="glass-card rounded-[40px] p-8 border border-white/10 space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500/80 ml-1">Accent Color</label>
                <div className="flex items-center gap-4 bg-black/40 p-3 rounded-3xl border border-white/5">
                  <div className="w-14 h-14 rounded-[20px] overflow-hidden border-2 border-white/10 relative">
                    <input 
                      type="color" 
                      value={config.accentColor} 
                      onChange={(e) => setConfig({...config, accentColor: e.target.value})}
                      className="absolute inset-0 scale-[3] cursor-pointer" 
                    />
                  </div>
                  <input 
                    type="text" 
                    value={config.accentColor} 
                    onChange={(e) => setConfig({...config, accentColor: e.target.value})}
                    className="bg-transparent flex-1 outline-none font-mono text-lg uppercase" 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500/80 ml-1">Typography</label>
                <div className="relative group">
                  <select 
                    value={config.fontFamily}
                    onChange={(e) => setConfig({...config, fontFamily: e.target.value})}
                    className="w-full bg-black/40 border border-white/5 p-5 rounded-3xl outline-none appearance-none font-bold text-lg focus:border-blue-500/50 transition-all cursor-pointer"
                  >
                    <option value="Inter" className="bg-[#111]">Google Inter</option>
                    <option value="Unbounded" className="bg-[#111]">Unbounded</option>
                    <option value="Montserrat" className="bg-[#111]">Montserrat</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-100 transition-opacity" size={20} />
                </div>
              </div>
            </section>

            <button 
              onClick={saveBrand}
              disabled={loading}
              className="w-full py-6 bg-blue-600 hover:bg-blue-500 rounded-[32px] font-black text-lg shadow-2xl shadow-blue-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" /> : <span>SAVE CHANGES</span>}
            </button>
            
            {status && <p className="text-center text-xs font-bold text-green-500 uppercase tracking-widest animate-pulse">{status}</p>}
          </>
        )}
      </div>
    </div>
  )
}
