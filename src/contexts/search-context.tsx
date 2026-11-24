'use client'

// React Imports
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

type SearchContextValue = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const SearchContext = createContext<SearchContextValue | null>(null)

/** Open state for the global command menu; toggles on ⌘K / Ctrl+K anywhere in the app. */
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen(current => !current)
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const value = useMemo(() => ({ open, setOpen }), [open])

  return <SearchContext value={value}>{children}</SearchContext>
}

export const useSearch = () => {
  const context = useContext(SearchContext)

  if (!context) throw new Error('useSearch must be used within a SearchProvider')

  return context
}
