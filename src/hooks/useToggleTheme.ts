import { useStore } from '@/src/store'

export const useToogleTheme = () => {
  const { isDark, toggleTheme } = useStore()

  return { isDark, toggleTheme }
}
