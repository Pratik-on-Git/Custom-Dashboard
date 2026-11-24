// Type Imports
import type { ComponentProps } from 'react'

// Third-party Imports
import { SearchIcon, XIcon } from 'lucide-react'

// Component Imports
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'

// Util Imports
import { cn } from '@/lib/utils'

type SearchInputProps = Omit<ComponentProps<'input'>, 'type' | 'value' | 'onChange' | 'size'> & {
  value: string
  onValueChange: (value: string) => void

  /** Accessible label; defaults to the placeholder */
  label?: string
  size?: 'sm' | 'md'
}

/** Global: search field with a leading icon and a clear button. Used by table toolbars, lists and app filters. */
const SearchInput = ({
  value,
  onValueChange,
  label,
  placeholder = 'Search…',
  size = 'md',
  className,
  ...props
}: SearchInputProps) => (
  <InputGroup data-slot='search-input' className={cn(size === 'sm' && 'h-8', className)}>
    <InputGroupAddon>
      <SearchIcon />
    </InputGroupAddon>
    <InputGroupInput
      type='search'
      value={value}
      onChange={event => onValueChange(event.target.value)}
      placeholder={placeholder}
      aria-label={label ?? placeholder}
      className='[&::-webkit-search-cancel-button]:hidden'
      {...props}
    />
    {value && (
      <InputGroupAddon align='inline-end'>
        <InputGroupButton size='icon-xs' aria-label='Clear search' onClick={() => onValueChange('')}>
          <XIcon />
        </InputGroupButton>
      </InputGroupAddon>
    )}
  </InputGroup>
)

export { SearchInput }
export type { SearchInputProps }
