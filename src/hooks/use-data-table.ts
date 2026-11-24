'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// Third-party Imports
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import type {
  ColumnDef,
  ColumnFiltersState,
  FilterFnOption,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState
} from '@tanstack/react-table'
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryStates } from 'nuqs'

/** A column filter mirrored to the URL: `array` for faceted (multi-select) filters, `string` for text filters. */
type UrlColumnFilter = {
  columnId: string
  type: 'array' | 'string'

  /** Query-string key (defaults to the column id) */
  urlKey?: string
}

type UseDataTableOptions<TData> = {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  getRowId?: (row: TData) => string

  /** Filters kept in the URL. Define this array at module level so it stays stable between renders. */
  urlFilters?: UrlColumnFilter[]

  /** Custom global search (defaults to TanStack's `includesString` over all columns) */
  globalFilterFn?: FilterFnOption<TData>
  enableRowSelection?: boolean
  defaultPageSize?: number
  initialSorting?: SortingState
  initialColumnVisibility?: VisibilityState
}

const NO_URL_FILTERS: UrlColumnFilter[] = []

/**
 * Builds a client-side TanStack table with sorting, filtering, faceting, pagination and row selection.
 * Page, page size, search (`q`) and the configured column filters live in the URL (via nuqs), so a filtered view
 * can be shared or bookmarked; sorting, column visibility and selection stay local.
 */
export const useDataTable = <TData>({
  data,
  columns,
  getRowId,
  urlFilters = NO_URL_FILTERS,
  globalFilterFn = 'includesString',
  enableRowSelection = false,
  defaultPageSize = 10,
  initialSorting = [],
  initialColumnVisibility = {}
}: UseDataTableOptions<TData>) => {
  const parsers = useMemo(
    () => ({
      page: parseAsInteger.withDefault(1),
      pageSize: parseAsInteger.withDefault(defaultPageSize),
      q: parseAsString.withDefault(''),
      ...Object.fromEntries(
        urlFilters.map(filter => [
          filter.urlKey ?? filter.columnId,
          filter.type === 'array' ? parseAsArrayOf(parseAsString).withDefault([]) : parseAsString.withDefault('')
        ])
      )
    }),
    [urlFilters, defaultPageSize]
  )

  const [query, setQuery] = useQueryStates(parsers, { history: 'replace' })
  const values = query as Record<string, unknown> & { page: number; pageSize: number; q: string }
  const patchQuery = (patch: Record<string, unknown>) => void setQuery(patch as Parameters<typeof setQuery>[0])

  const [sorting, setSorting] = useState<SortingState>(initialSorting)
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumnVisibility)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [localFilters, setLocalFilters] = useState<ColumnFiltersState>([])

  const urlColumnIds = useMemo(() => new Set(urlFilters.map(filter => filter.columnId)), [urlFilters])

  const columnFilters = useMemo<ColumnFiltersState>(() => {
    const fromUrl = urlFilters.flatMap(filter => {
      const value = values[filter.urlKey ?? filter.columnId]
      const isSet = Array.isArray(value) ? value.length > 0 : Boolean(value)

      return isSet ? [{ id: filter.columnId, value }] : []
    })

    return [...localFilters.filter(filter => !urlColumnIds.has(filter.id)), ...fromUrl]
  }, [localFilters, urlColumnIds, urlFilters, values])

  const pagination: PaginationState = { pageIndex: Math.max(0, values.page - 1), pageSize: values.pageSize }

  const onColumnFiltersChange: OnChangeFn<ColumnFiltersState> = updater => {
    const next = typeof updater === 'function' ? updater(columnFilters) : updater
    const patch: Record<string, unknown> = { page: null }

    setLocalFilters(next.filter(filter => !urlColumnIds.has(filter.id)))
    urlFilters.forEach(filter => {
      const value = next.find(item => item.id === filter.columnId)?.value
      const isSet = Array.isArray(value) ? value.length > 0 : Boolean(value)

      patch[filter.urlKey ?? filter.columnId] = isSet ? value : null
    })
    patchQuery(patch)
  }

  const onPaginationChange: OnChangeFn<PaginationState> = updater => {
    const next = typeof updater === 'function' ? updater(pagination) : updater

    patchQuery({ page: next.pageIndex + 1, pageSize: next.pageSize })
  }

  const onGlobalFilterChange: OnChangeFn<string> = updater => {
    const next = typeof updater === 'function' ? updater(values.q) : updater

    patchQuery({ q: next || null, page: null })
  }

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getRowId,
    state: { sorting, columnVisibility, rowSelection, columnFilters, globalFilter: values.q, pagination },
    enableRowSelection,
    autoResetPageIndex: false,
    globalFilterFn,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange,
    onPaginationChange,
    onGlobalFilterChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  // Pull the page back into range when filters shrink the result set
  const pageCount = table.getPageCount()

  useEffect(() => {
    if (pageCount > 0 && values.page > pageCount) void setQuery({ page: null })
  }, [pageCount, values.page, setQuery])

  return table
}

export type { UrlColumnFilter, UseDataTableOptions }
