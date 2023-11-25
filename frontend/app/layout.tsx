import type { Metadata } from 'next'
import { Inter as FontSans } from "next/font/google"
import './globals.css'
import { cn } from "@/lib/utils"
import TanstackProvider from '@/components/providers/TanstackProvider'
import { StoreProvider } from './redux/StoreProvider'

export const metadata: Metadata = {
  title: 'Ling Link',
  description: 'Ứng dụng học tiếng Anh',
}

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <StoreProvider>
          <TanstackProvider>
            {children}
          </TanstackProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
