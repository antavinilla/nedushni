'use client'
import './globals.css'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState({
    accentColor: '#3B82F6',
    fontFamily: 'Inter',
    logoUrl: ''
  })

  useEffect(() => {
    async function getTheme() {
      const { data } = await supabase.from('settings').select('value').eq('key', 'theme').single()
      if (data && data.value) {
        setTheme(data.value)
        // Впорскуємо колір у CSS-змінну
        document.documentElement.style.setProperty('--accent-color', data.value.accentColor)
        // Міняємо шрифт для всього body
        document.body.style.fontFamily = data.value.fontFamily === 'Unbounded' 
          ? '"Unbounded", sans-serif' 
          : '"Inter", sans-serif'
      }
    }
    getTheme()
  }, [])

  return (
    <html lang="uk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Unbounded:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen bg-black text-white">
        {children}
      </body>
    </html>
  )
}
