import type { Metadata } from 'next'
import '@/src/styles/globals.css'

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
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
