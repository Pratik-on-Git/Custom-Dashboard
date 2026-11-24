// React Imports
import type { ReactNode } from 'react'

// Next Imports
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Geist, Geist_Mono, Inter, Manrope } from 'next/font/google'

// Third-party Imports
import { NuqsAdapter } from 'nuqs/adapters/next/app'

// Component Imports
import Providers from '@/components/Providers'
import { TooltipProvider } from '@/components/ui/tooltip'

import ScrollToTop from '@/components/layout/ScrollToTop'
import SkipToMain from '@/components/layout/SkipToMain'
import UpgradeProButton from '@/components/layout/UpgradePro'

// Util Imports
import { cn } from '@/lib/utils'
import { resolvePreferences } from '@/utils/preference-utils'

// Style Imports
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

// Alternative UI fonts, selectable from Theme Settings / Settings → Appearance
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'AdminCN - Free Shadcn Admin Dashboard Template',
  description:
    'Build modern admin dashboards faster with AdminCN Free. A free shadcn admin dashboard template built with Tailwind CSS, featuring responsive layouts and essential pages.',
  openGraph: {
    title: 'AdminCN - Free Shadcn Admin Dashboard Template',
    description:
      'Build modern admin dashboards faster with AdminCN Free. A free shadcn admin dashboard template built with Tailwind CSS, featuring responsive layouts and essential pages.',
    type: 'website',
    siteName: 'AdminCN',
    url: process.env.NEXT_PUBLIC_APP_URL,
    images: [
      {
        url: '/images/og-image.png',
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'AdminCN - Free Shadcn Admin Dashboard Template'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AdminCN - Free Shadcn Admin Dashboard Template',
    description:
      'Build modern admin dashboards faster with AdminCN Free. A free shadcn admin dashboard template built with Tailwind CSS, featuring responsive layouts and essential pages.'
  }
}

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const cookieStore = await cookies()
  const preferences = resolvePreferences(name => cookieStore.get(name)?.value)
  const sidebarDefaultOpen = cookieStore.get('sidebar_state')?.value !== 'false'

  return (
    <html
      lang='en'
      dir={preferences.direction}
      data-font={preferences.font}
      className={cn(
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        manrope.variable,
        'flex min-h-full w-full antialiased'
      )}
      data-scroll-behavior='smooth'
      suppressHydrationWarning
    >
      <body className='flex min-h-full w-full flex-auto flex-col'>
        <SkipToMain />
        <NuqsAdapter>
          <Providers sidebarDefaultOpen={sidebarDefaultOpen} preferences={preferences}>
            <TooltipProvider>{children}</TooltipProvider>
          </Providers>
        </NuqsAdapter>

        <ScrollToTop />

        <UpgradeProButton />
      </body>
    </html>
  )
}

export default RootLayout
