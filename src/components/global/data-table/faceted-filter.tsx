'use client'

// Type Imports
import type { ReactNode } from 'react'

import type { Column } from '@tanstack/react-table'

// Third-party Imports
import { CheckIcon, CirclePlusIcon } from 'lucide-react'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

// Util Imports
import { cn } from '@/lib/utils'

type FacetOption = {
  label: string
  value: string
  icon?: ReactNode
}

type DataTableFacetedFilterProps<TData, TValue> = {
  column: Column<TData, TValue>
  title: string
  options: FacetOption[]
}

/**
 * Global: multi-select column filter (dashed "+ Status" button) with per-option counts. The column must use
 * `filterFn: 'arrIncludesSome'` and the table needs faceted row models (`useDataTable` adds them).
 */
const DataTableFacetedFilter = <TData, TValue>({
  column,
  title,
  options
}: DataTableFacetedFilterProps<TData, TValue>) => {
  const facets = column.getFacetedUniqueValues()
  const selected = new Set((column.getFilterValue() as string[] | undefined) ?? [])

  const toggle = (value: string) => {
    const next = new Set(selected)

    if (next.has(value)) next.delete(value)
    else next.add(value)
    column.setFilterValue(next.size ? [...next] : undefined)
  }

  return (
    <Popover>
      <PopoverTrigger render={<Button variant='outline' size='sm' className='border-dashed' />}>
        <CirclePlusIcon data-icon='inline-start' />
        {title}
        {selected.size > 0 && (
          <>
            <Separator orientation='vertical' className='mx-1 h-4! self-center' />
            <Badge variant='secondary' className='rounded-sm px-1 font-normal lg:hidden'>
              {selected.size}
            </Badge>
            <span className='hidden gap-1 lg:flex'>
              {selected.size > 2 ? (
                <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
                  {selected.size} selected
                </Badge>
              ) : (
                options
                  .filter(option => selected.has(option.value))
                  .map(option => (
                    <Badge key={option.value} variant='secondary' className='rounded-sm px-1 font-normal'>
                      {option.label}
                    </Badge>
                  ))
              )}
            </span>
          </>
        )}
      </PopoverTrigger>
      <PopoverContent className='w-56 p-0' align='start'>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map(option => {
                const isSelected = selected.has(option.value)

                return (
                  <CommandItem key={option.value} value={option.label} onSelect={() => toggle(option.value)}>
                    <span
                      className={cn(
                        'border-primary flex size-4 items-center justify-center rounded-[4px] border',
                        isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className='size-3' />
                    </span>
                    {option.icon && <span className='text-muted-foreground [&_svg]:size-4'>{option.icon}</span>}
                    <span>{option.label}</span>
                    {facets.get(option.value) !== undefined && (
                      <span className='text-muted-foreground ms-auto font-mono text-xs tabular-nums'>
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selected.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={() => column.setFilterValue(undefined)} className='justify-center'>
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { DataTableFacetedFilter }
export type { DataTableFacetedFilterProps, FacetOption }
