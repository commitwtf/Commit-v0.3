import { useEffect, useState } from 'react'

export const useToogleTheme = () => {
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

  return { isDark, toggleTheme }
}
