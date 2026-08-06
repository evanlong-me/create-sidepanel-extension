import { useEffect, useState } from 'react'

type Theme = 'system' | 'light' | 'dark'

interface UseThemeProps {
  theme: Theme
  onThemeChange?: (theme: Theme) => void
}

export function useTheme({ theme, onThemeChange }: UseThemeProps) {
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  // Get system theme
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return 'light'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Update document theme
  const updateDocumentTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Resolve current theme to apply
  const resolveTheme = (currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      return getSystemTheme()
    }
    return currentTheme
  }

  // Listen for theme changes and update document
  useEffect(() => {
    const resolved = resolveTheme(theme)
    setResolvedTheme(resolved)
    updateDocumentTheme(resolved === 'dark')
  }, [theme])

  // Listen for system theme changes (only when theme is set to system)
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleSystemThemeChange = () => {
      const systemTheme = getSystemTheme()
      setResolvedTheme(systemTheme)
      updateDocumentTheme(systemTheme === 'dark')
    }

    // Execute immediately
    handleSystemThemeChange()

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    onThemeChange?.(newTheme)
  }

  return {
    theme,
    resolvedTheme,
    setTheme
  }
} 
