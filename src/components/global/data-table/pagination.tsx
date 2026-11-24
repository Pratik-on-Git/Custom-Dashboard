'use client'

// Type Imports
import type { Table } from '@tanstack/react-table'

// Third-party Imports
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { SelectField } from '@/components/global/inputs/select-field'

// Hook Imports
import { usePagination } from '@/hooks/use-pagination'

// Util Imports
import { cn } from '@/lib/utils'
import { formatNumber } from '@/utils/format-utils'

type DataTablePaginationProps<TData> = {
  table: Table<TData>
  pageSizeOptions?: number[]
  className?: string
}

/** Global: table footer — selection count, rows-per-page, page x of y and first / prev / numbered / next / last. */
const DataTablePagination = <TData,>({
  table,
  pageSizeOptions = [10, 20, 30, 50],
  className
}: DataTablePaginationProps<TData>) => {
  const { pageIndex, pageSize } = table.getState().pagination
  const currentPage = pageIndex + 1
  const totalPages = Math.max(table.getPageCount(), 1)
  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const totalRows = table.getFilteredRowModel().rows.length

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay: 3
  })

  return (
    <div
      data-slot='data-table-pagination'
      className={cn('flex flex-wrap items-center justify-between gap-x-6 gap-y-3', className)}
    >
      <p className='text-muted-foreground text-sm' aria-live='polite'>
        {selectedCount > 0
          ? `${formatNumber(selectedCount)} of ${formatNumber(totalRows)} row(s) selected`
          : `${formatNumber(totalRows)} row(s)`}
      </p>

      <div className='flex flex-wrap items-center gap-x-6 gap-y-3'>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium max-sm:sr-only'>Rows per page</span>
          <SelectField
            size='sm'
            className='w-18'
            options={pageSizeOptions.map(option => ({ value: String(option), label: String(option) }))}
            value={String(pageSize)}
            onValueChange={value => table.setPageSize(Number(value))}
          />
        </div>

        <span className='text-sm font-medium tabular-nums max-md:hidden'>
          Page {currentPage} of {totalPages}
        </span>

        <nav aria-label='Pagination' className='flex items-center gap-1'>
          <Button
            variant='outline'
            size='icon-sm'
            className='max-sm:hidden'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label='Go to first page'
          >
            <ChevronsLeftIcon />
          </Button>
          <Button
            variant='outline'
            size='icon-sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label='Go to previous page'
          >
            <ChevronLeftIcon />
          </Button>

          {showLeftEllipsis && <span className='text-muted-foreground px-1 text-sm'>…</span>}
          {pages.map(page => (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'outline'}
              size='sm'
              className='min-w-8 px-2 tabular-nums'
              onClick={() => table.setPageIndex(page - 1)}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </Button>
          ))}
          {showRightEllipsis && <span className='text-muted-foreground px-1 text-sm'>…</span>}

          <Button
            variant='outline'
            size='icon-sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label='Go to next page'
          >
            <ChevronRightIcon />
          </Button>
          <Button
            variant='outline'
            size='icon-sm'
            className='max-sm:hidden'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            aria-label='Go to last page'
          >
            <ChevronsRightIcon />
          </Button>
        </nav>
      </div>
    </div>
  )
}

export { DataTablePagination }
export type { DataTablePaginationProps }
