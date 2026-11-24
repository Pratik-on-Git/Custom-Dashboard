// Type Imports
import type { MenuItem, MenuSubItem } from '@/configs/navConfig'

// Config Imports
import { navItems } from '@/configs/navConfig'

export type SearchEntry = {
  group: string

  /** Breadcrumb-style label, e.g. ["Users", "List"] */
  path: string[]
  href: string
  icon: MenuItem['icon']
}

const isInternal = (href: string) => href.startsWith('/')

const leavesOf = (item: MenuSubItem, parents: string[]): { path: string[]; href: string }[] =>
  'childItems' in item
    ? item.childItems.flatMap(child => leavesOf(child, [...parents, item.label]))
    : [{ path: [...parents, item.label], href: item.href }]

/** Every internal page in the sidebar, flattened for the ⌘K command menu (external / Pro links are skipped). */
export const searchEntries: SearchEntry[] = navItems.flatMap(group =>
  group.items.flatMap(item => {
    const leaves = item.childItems
      ? item.childItems.flatMap(child => leavesOf(child, [item.label]))
      : [{ path: [item.label], href: item.href }]

    return leaves
      .filter(leaf => isInternal(leaf.href))
      .map(leaf => ({ group: group.groupLabel ?? 'General', path: leaf.path, href: leaf.href, icon: item.icon }))
  })
)
