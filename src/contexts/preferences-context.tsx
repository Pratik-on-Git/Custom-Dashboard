'use client'

// React Imports
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

// Third-party Imports
import { DirectionProvider } from '@base-ui/react/direction-provider'

// Type Imports
import type { Preferences } from '@/types/preferences-types'

// Config Imports
import themeConfig from '@/configs/themeConfig'

// Util Imports
import { writePreferenceCookie } from '@/utils/preference-utils'

type PreferencesContextValue = Preferences & {
  defaults: Preferences
  setPreference: <TKey extends keyof Preferences>(key: TKey, value: Preferences[TKey]) => void
  resetPreferences: () => void
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null)

type PreferencesProviderProps = {
  children: ReactNode

  /** Values read from cookies on the server, so the first paint already matches */
  initial: Preferences
}

/**
 * App-wide layout preferences (sidebar style, collapse mode, font, text direction).
 * Every change is written to a cookie and mirrored onto `<html>` (`data-font`, `dir`).
 */
export const PreferencesProvider = ({ initial, children }: PreferencesProviderProps) => {
  const [preferences, setPreferences] = useState<Preferences>(initial)

  useEffect(() => {
    const root = document.documentElement

    root.dataset.font = preferences.font
    root.dir = preferences.direction
  }, [preferences.font, preferences.direction])

  const value = useMemo<PreferencesContextValue>(() => {
    const setPreference: PreferencesContextValue['setPreference'] = (key, next) => {
      writePreferenceCookie(key, next)
      setPreferences(current => ({ ...current, [key]: next }))
    }

    return {
      ...preferences,
      defaults: themeConfig.preferences,
      setPreference,
      resetPreferences: () => {
        ;(Object.keys(themeConfig.preferences) as (keyof Preferences)[]).forEach(key =>
          writePreferenceCookie(key, themeConfig.preferences[key])
        )
        setPreferences(themeConfig.preferences)
      }
    }
  }, [preferences])

  return (
    <PreferencesContext value={value}>
      <DirectionProvider direction={preferences.direction}>{children}</DirectionProvider>
    </PreferencesContext>
  )
}

export const usePreferences = () => {
  const context = useContext(PreferencesContext)

  if (!context) throw new Error('usePreferences must be used within a PreferencesProvider')

  return context
}
