import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { VideoProvider } from '@/context/VideoContext'
import { ListVideos } from '@/components/ListVideos'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
 title: 'VIDEOPLAYER',
 description: 'VIDEO PLAYER APP',
}

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode
}>) {
 return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-slate-900 text-slate-600 font-extrabold`}>
        <VideoProvider>
          <main className="flex flex-col ">
            <header className="flex items-center p-5 h-16 w-full border-b bg-slate-600 border-slate-600 text-white justify-center">
              <h1 className='text-red-500 text-4xl'> Video </h1> 
              <h1 className='text-gray-200 text-4xl'> Player </h1>
            </header>
            <div className="flex flex-col p-5 gap-5">
              {children}
              <aside className="w-full">
                <ListVideos/>
              </aside>
            </div>
          </main>
        </VideoProvider>
      </body>
    </html>
 )
}
