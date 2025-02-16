import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
// import NextUIProvider from './NextUIProvider'
// import { cn } from '@nextui-org/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Event MS',
  description: 'Event management system',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} dark text-foreground bg-background h-screen w-screen`}
      >
        {/* <NextUIProvider> */}
        {children}

        {/* </NextUIProvider> */}
        <Toaster expand={true} richColors />
      </body>
    </html>
  )
}
