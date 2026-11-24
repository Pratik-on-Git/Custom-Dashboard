'use client'

// Type Imports
import type { ColumnDef } from '@tanstack/react-table'

// Component Imports
import { Checkbox } from '@/components/ui/checkbox'

/** Global: checkbox column for row selection (header toggles the current page). Put it first in `columns`. */
const createSelectColumn = <TData,>(): ColumnDef<TData> => ({
  id: 'select',
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      indeterminate={table.getIsSomePageRowsSelected()}
      onCheckedChange={checked => table.toggleAllPageRowsSelected(checked)}
      aria-label='Select all rows on this page'
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={checked => row.toggleSelected(checked)}
      aria-label='Select row'
    />
  ),
  meta: { className: 'w-10' },
  enableSorting: false,
  enableHiding: false
})

export { createSelectColumn }
