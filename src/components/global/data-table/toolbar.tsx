'use client'

// Type Imports
import type { ReactNode } from 'react'

import type { Table } from '@tanstack/react-table'

// Third-party Imports
import { XIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/global/inputs/search-input'
import { DataTableFacetedFilter, type FacetOption } from './faceted-filter'
import { DataTableViewOptions } from './view-options'

type DataTableFilter = {
  columnId: string
  title: string
  options: FacetOption[]
}

type DataTableToolbarProps<TData> = {
  table: Table<TData>
  searchPlaceholder?: string

  /** Search a single column instead of the global filter */
  searchColumnId?: string
  filters?: DataTableFilter[]

  /** Extra controls on the right, before the "View" menu */
  actions?: ReactNode
}

/** Global: table toolbar — search, faceted filters, reset and the column "View" menu. */
const DataTableToolbar = <TData,>({
  table,
  searchPlaceholder = 'Filter…',
  searchColumnId,
  filters = [],
  actions
}: DataTableToolbarProps<TData>) => {
  const searchColumn = searchColumnId ? table.getColumn(searchColumnId) : undefined

  const searchValue = searchColumn
    ? ((searchColumn.getFilterValue() as string) ?? '')
    : (table.getState().globalFilter ?? '')

  const isFiltered = table.getState().columnFilters.length > 0 || Boolean(table.getState().globalFilter)

  const setSearch = (value: string) => {
    if (searchColumn) searchColumn.setFilterValue(value || undefined)
    else table.setGlobalFilter(value)
  }

  return (
    <div data-slot='data-table-toolbar' className='flex flex-wrap items-center gap-2'>
      <SearchInput
        size='sm'
        value={String(searchValue)}
        onValueChange={setSearch}
        placeholder={searchPlaceholder}
        className='w-full sm:w-64'
      />
      {filters.map(filter => {
        const column = table.getColumn(filter.columnId)

        return column ? (
          <DataTableFacetedFilter key={filter.columnId} column={column} title={filter.title} options={filter.options} />
        ) : null
      })}
      {isFiltered && (
        <Button
          variant='ghost'
          size='sm'
          onClick={() => {
            table.resetColumnFilters()
            table.setGlobalFilter('')
          }}
        >
          Reset
          <XIcon data-icon='inline-end' />
        </Button>
      )}
      <div className='ms-auto flex items-center gap-2'>
        {actions}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}

export { DataTableToolbar }
export type { DataTableToolbarProps, DataTableFilter }
