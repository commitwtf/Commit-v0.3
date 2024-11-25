'use client'

import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

interface IStoreContext {
  isDark: boolean
  toggleTheme: () => void
}

const StoreContext = createContext<IStoreContext>({
  isDark: false,
  toggleTheme: () => {},
})

export const StoreContextProvider = ({ children }: PropsWithChildren) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDark(!isDarkMode)
    localStorage.setItem('darkMode', (!isDarkMode).toString())
    document.documentElement.classList.toggle('dark')
  }

  const providerValue: IStoreContext = {
    isDark,
    toggleTheme,
  }

  return <StoreContext.Provider value={providerValue}>{children}</StoreContext.Provider>
}
export const useStore = () => useContext(StoreContext)
