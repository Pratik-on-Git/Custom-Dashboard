'use client'

// React Imports
import { useRef } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'

// Type Imports
import type { Table } from '@tanstack/react-table'

// Third-party Imports
import { XIcon } from 'lucide-react'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>

  /** Singular noun for the rows, e.g. "task" */
  entityName: string

  /** Action buttons (use `BulkActionButton`) */
  children: ReactNode
}

const plural = (count: number, noun: string) => `${noun}${count === 1 ? '' : 's'}`

/**
 * Global: floating toolbar that appears while rows are selected. Arrow keys move between actions, Escape clears the
 * selection, and the count is announced to screen readers.
 */
const DataTableBulkActions = <TData,>({ table, entityName, children }: DataTableBulkActionsProps<TData>) => {
  const toolbarRef = useRef<HTMLDivElement>(null)
  const count = table.getFilteredSelectedRowModel().rows.length

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const buttons = [...(toolbarRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? [])]
    const index = buttons.findIndex(button => button === document.activeElement)

    const focus = (next: number) => {
      event.preventDefault()
      buttons[(next + buttons.length) % buttons.length]?.focus()
    }

    if (event.key === 'ArrowRight') focus(index + 1)
    if (event.key === 'ArrowLeft') focus(index - 1)
    if (event.key === 'Home') focus(0)
    if (event.key === 'End') focus(buttons.length - 1)

    // Escape inside an open menu belongs to the menu
    if (event.key === 'Escape' && !(event.target as HTMLElement).closest('[role="menu"]')) {
      event.preventDefault()
      table.resetRowSelection()
    }
  }

  return (
    <>
      <div className='sr-only' role='status' aria-live='polite' aria-atomic='true'>
        {count > 0 ? `${count} ${plural(count, entityName)} selected. Bulk actions toolbar is available.` : ''}
      </div>

      {count > 0 && (
        <div
          ref={toolbarRef}
          role='toolbar'
          aria-label={`Bulk actions for ${count} selected ${plural(count, entityName)}`}
          onKeyDown={handleKeyDown}
          className='bg-popover/95 supports-backdrop-filter:bg-popover/75 ring-foreground/10 animate-in fade-in-0 slide-in-from-bottom-4 fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl p-2 shadow-lg ring-1 backdrop-blur-lg motion-reduce:animate-none'
        >
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant='outline'
                  size='icon-xs'
                  className='rounded-full'
                  onClick={() => table.resetRowSelection()}
                  aria-label='Clear selection'
                />
              }
            >
              <XIcon />
            </TooltipTrigger>
            <TooltipContent>Clear selection (Esc)</TooltipContent>
          </Tooltip>
          <Separator orientation='vertical' className='h-5! self-center' />
          <span className='flex items-center gap-1.5 text-sm whitespace-nowrap'>
            <Badge className='min-w-7 tabular-nums'>{count}</Badge>
            <span className='max-sm:sr-only'>{plural(count, entityName)}</span> selected
          </span>
          <Separator orientation='vertical' className='h-5! self-center' />
          <div className='flex items-center gap-1.5'>{children}</div>
        </div>
      )}
    </>
  )
}

type BulkActionButtonProps = {
  label: string
  icon: ReactNode
  onClick?: () => void
  variant?: 'outline' | 'destructive'
}

/** Icon button with a tooltip for the bulk-actions toolbar. */
const BulkActionButton = ({ label, icon, onClick, variant = 'outline' }: BulkActionButtonProps) => (
  <Tooltip>
    <TooltipTrigger render={<Button variant={variant} size='icon-sm' onClick={onClick} aria-label={label} />}>
      {icon}
    </TooltipTrigger>
    <TooltipContent>{label}</TooltipContent>
  </Tooltip>
)

export { DataTableBulkActions, BulkActionButton }
export type { DataTableBulkActionsProps, BulkActionButtonProps }
