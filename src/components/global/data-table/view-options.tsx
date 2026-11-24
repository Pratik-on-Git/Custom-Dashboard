'use client'

// Type Imports
import type { Table } from '@tanstack/react-table'

// Third-party Imports
import { Settings2Icon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

/** Global: "View" menu that toggles which (hideable) columns are visible. Labels come from `meta.label`. */
const DataTableViewOptions = <TData,>({ table }: { table: Table<TData> }) => {
  const columns = table.getAllLeafColumns().filter(column => column.accessorFn !== undefined && column.getCanHide())

  if (!columns.length) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant='outline' size='sm' className='ms-auto hidden lg:inline-flex' />}>
        <Settings2Icon data-icon='inline-start' />
        View
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-44'>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {columns.map(column => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className='capitalize'
              checked={column.getIsVisible()}
              onCheckedChange={value => column.toggleVisibility(Boolean(value))}
            >
              {column.columnDef.meta?.label ?? column.id}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { DataTableViewOptions }
