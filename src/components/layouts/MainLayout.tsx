'use client'

import { Header, Sidebar } from '@/src/components'
import { useToogleTheme } from '@/src/hooks'
import { StoreContextProvider } from '@/src/store'
import { PropsWithChildren } from 'react'

export const MainLayout = ({ children }: PropsWithChildren) => {
  const { isDark } = useToogleTheme()

  return (
    <StoreContextProvider>
      <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
        <Header />
        <div className='flex flex-1 overflow-hidden bg-[#E7E7E7] dark:bg-[#141414] transition-all duration-300 ease-in-out'>
          <Sidebar />
          {children}
        </div>
      </div>
    </StoreContextProvider>
  )
}
