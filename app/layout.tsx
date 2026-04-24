import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'Board Games Hub',
  description: 'Каталог настільних ігор та ігросесії',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className="antialiased min-h-screen">
        <main className="max-w-md mx-auto relative min-h-screen border-x border-gray-200 dark:border-gray-800">
          {children}
        </main>
      </body>
    </html>
  )
}
