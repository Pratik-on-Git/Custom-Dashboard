export type SidebarVariant = 'sidebar' | 'inset' | 'floating'

/** `offcanvas` hides the sidebar fully when collapsed, `icon` keeps an icon rail */
export type SidebarCollapsible = 'offcanvas' | 'icon'

/** `default` = full-width bar attached to the top; `floating` = rounded card bar with a blurred backdrop */
export type NavbarVariant = 'default' | 'floating'

export type AppFont = 'geist' | 'inter' | 'manrope'

export type TextDirection = 'ltr' | 'rtl'

export type Preferences = {
  sidebarVariant: SidebarVariant
  sidebarCollapsible: SidebarCollapsible
  navbarVariant: NavbarVariant
  font: AppFont
  direction: TextDirection
}
