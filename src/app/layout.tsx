import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/contexts/AppContext'
import Layout from '@/components/layout/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Top Promo Br - E-commerce',
  description: 'Sua loja online de confiança com os melhores produtos e promoções',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AppProvider>
          <Layout>
            {children}
          </Layout>
        </AppProvider>
      </body>
    </html>
  )
}
