// Type Imports
import type {
  AppFont,
  NavbarVariant,
  Preferences,
  SidebarCollapsible,
  SidebarVariant,
  TextDirection
} from '@/types/preferences-types'

// Config Imports
import themeConfig from '@/configs/themeConfig'

const ONE_YEAR = 60 * 60 * 24 * 365

/** Cookie name for every preference, so the server layout and the client provider agree. */
export const preferenceCookies = {
  sidebarVariant: 'pref_sidebar_variant',
  sidebarCollapsible: 'pref_sidebar_collapsible',
  navbarVariant: 'pref_navbar_variant',
  font: 'pref_font',
  direction: 'pref_direction'
} as const satisfies Record<keyof Preferences, string>

const allowed = {
  sidebarVariant: ['sidebar', 'inset', 'floating'] satisfies SidebarVariant[],
  sidebarCollapsible: ['offcanvas', 'icon'] satisfies SidebarCollapsible[],
  navbarVariant: ['default', 'floating'] satisfies NavbarVariant[],
  font: ['geist', 'inter', 'manrope'] satisfies AppFont[],
  direction: ['ltr', 'rtl'] satisfies TextDirection[]
} as const

export const fontOptions = allowed.font

/** Builds preferences from raw cookie values, falling back to the theme defaults for anything unknown. */
export const resolvePreferences = (read: (cookie: string) => string | undefined): Preferences => {
  const pick = <TKey extends keyof Preferences>(key: TKey): Preferences[TKey] => {
    const value = read(preferenceCookies[key])

    return (allowed[key] as readonly string[]).includes(value ?? '')
      ? (value as Preferences[TKey])
      : themeConfig.preferences[key]
  }

  return {
    sidebarVariant: pick('sidebarVariant'),
    sidebarCollapsible: pick('sidebarCollapsible'),
    navbarVariant: pick('navbarVariant'),
    font: pick('font'),
    direction: pick('direction')
  }
}

/** Client-side cookie writer. */
export const writePreferenceCookie = (key: keyof Preferences, value: string) => {
  document.cookie = `${preferenceCookies[key]}=${value}; path=/; max-age=${ONE_YEAR}; samesite=lax`
}
