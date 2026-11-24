'use client'

// Type Imports
import type { ReactNode } from 'react'

import type { Table as TanstackTable } from '@tanstack/react-table'

// Third-party Imports
import { flexRender } from '@tanstack/react-table'
import { cva, type VariantProps } from 'class-variance-authority'

// Component Imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Util Imports
import { cn } from '@/lib/utils'

const dataTableVariants = cva('overflow-hidden', {
  variants: {
    /** `bordered` = standalone table with its own frame; `plain` = sits flush inside a card */
    variant: {
      bordered: 'bg-card rounded-xl border',
      plain: ''
    },
    density: {
      compact: '**:data-[slot=table-cell]:h-10',
      default: '**:data-[slot=table-cell]:h-13'
    }
  },
  defaultVariants: {
    variant: 'bordered',
    density: 'default'
  }
})

type DataTableProps<TData> = VariantProps<typeof dataTableVariants> & {
  table: TanstackTable<TData>

  /** Rendered in a full-width row when there are no rows (defaults to "No results.") */
  emptyState?: ReactNode

  /** Accessible table caption (visually hidden) */
  caption?: string
  className?: string
}

/**
 * Global: renders any TanStack table instance with the app's table styling. Column `meta` drives classes
 * (`className`, `thClassName`, `tdClassName`). Build the instance with `useDataTable`.
 */
const DataTable = <TData,>({ table, emptyState, caption, variant, density, className }: DataTableProps<TData>) => {
  const rows = table.getRowModel().rows

  return (
    <div data-slot='data-table' className={cn(dataTableVariants({ variant, density }), className)}>
      <Table>
        {caption && <caption className='sr-only'>{caption}</caption>}
        <TableHeader className='bg-muted/40'>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className='hover:bg-transparent'>
              {headerGroup.headers.map(header => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  aria-sort={
                    header.column.getIsSorted()
                      ? header.column.getIsSorted() === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                  className={cn(
                    'text-muted-foreground first:ps-4 last:pe-4',
                    header.column.columnDef.meta?.className,
                    header.column.columnDef.meta?.thClassName
                  )}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.length ? (
            rows.map(row => (
              <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      'first:ps-4 last:pe-4',
                      cell.column.columnDef.meta?.className,
                      cell.column.columnDef.meta?.tdClassName
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className='hover:bg-transparent'>
              <TableCell
                colSpan={table.getVisibleLeafColumns().length}
                className='text-muted-foreground h-32 text-center'
              >
                {emptyState ?? 'No results.'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export { DataTable, dataTableVariants }
export type { DataTableProps }
