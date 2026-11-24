'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

// Util Imports
import { cn } from '@/lib/utils'

type DatePickerProps = {
  value: Date | undefined
  onValueChange: (date: Date | undefined) => void
  placeholder?: string

  /** Earliest / latest selectable dates */
  fromDate?: Date
  toDate?: Date

  /** date-fns format for the trigger label */
  displayFormat?: string
  id?: string
  invalid?: boolean
  className?: string
}

/** Global: single-date picker — outline trigger + month/year dropdown calendar in a popover. */
const DatePicker = ({
  value,
  onValueChange,
  placeholder = 'Pick a date',
  fromDate = new Date(1900, 0, 1),
  toDate,
  displayFormat = 'd MMM yyyy',
  id,
  invalid,
  className
}: DatePickerProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            id={id}
            variant='outline'
            aria-invalid={invalid || undefined}
            className={cn('w-60 justify-start font-normal', !value && 'text-muted-foreground', className)}
          />
        }
      >
        <CalendarIcon data-icon='inline-start' />
        {value ? format(value, displayFormat) : placeholder}
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          captionLayout='dropdown'
          selected={value}
          defaultMonth={value}
          startMonth={fromDate}
          endMonth={toDate}
          disabled={date => date < fromDate || (toDate ? date > toDate : false)}
          onSelect={date => {
            onValueChange(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
export type { DatePickerProps }
