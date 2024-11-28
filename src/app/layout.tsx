import type { Metadata } from 'next'
import '@/src/styles/globals.css'
import { MainLayout } from '@/src/components'
import { WalletProvider } from '@/src/components/WalletProvider'

export const metadata: Metadata = {
  title: 'Commit',
  description: 'Onchain accountability protocol',
  icons: {
    icon: '/assets/images/favicon.svg',
  },
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang='en'>
      <body>
        <WalletProvider>
          <MainLayout>{children}</MainLayout>
        </WalletProvider>
      </body>
    </html>
  )
}

export default RootLayout
