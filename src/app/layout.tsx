import type { Metadata } from 'next'
import '@/src/styles/globals.css'
import { MainLayout } from '@/src/components'

export const metadata: Metadata = {
  title: 'Commit',
  description: 'Onchain accountability protocol',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang='en'>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}

export default RootLayout
