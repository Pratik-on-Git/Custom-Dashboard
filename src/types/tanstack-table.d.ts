import '@tanstack/react-table'

// Type Imports
import type { RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    thClassName?: string
    tdClassName?: string

    /** Applied to both the header and the body cells of the column */
    className?: string

    /** Human label for the "View" column toggle; defaults to the column id */
    label?: string
  }
}
