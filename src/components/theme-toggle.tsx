'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'
import { useMounted } from '@/hooks/use-mounted'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    if (!mounted) {
      return <Sun className="h-5 w-5" />
    }

    if (theme === 'light') {
      return <Sun className="h-5 w-5" />
    } else if (theme === 'dark') {
      return <Moon className="h-5 w-5" />
    } else {
      const isDarkSystem = window.matchMedia('(prefers-color-scheme: dark)').matches
      return isDarkSystem ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />
    }
  }

  const getTooltip = () => {
    if (!mounted) {
      return 'Change theme'
    }

    if (theme === 'light') {
      return 'Change to dark mode'
    } else if (theme === 'dark') {
      return 'Change to system mode'
    } else {
      return 'Change to light mode'
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      {getIcon()}
      {mounted && theme === 'system' && (
        <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-primary border border-background"></div>
      )}
    </button>
  )
}
