'use client'

// Third-party Imports
import { cva, type VariantProps } from 'class-variance-authority'
import { SearchIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/global/micro/kbd'

// Context Imports
import { useSearch } from '@/contexts/search-context'

// Util Imports
import { cn } from '@/lib/utils'

const searchTriggerVariants = cva('text-muted-foreground hidden font-normal shadow-none', {
  variants: {
    /** `field` = outlined search box (default navbar); `inline` = bare "Type to search… ⌘K" text (floating navbar) */
    variant: {
      field: 'bg-muted/30 w-56 justify-start md:inline-flex lg:w-64',
      inline: 'gap-1.5 px-2.5 hover:bg-transparent sm:inline-flex dark:hover:bg-transparent'
    }
  },
  defaultVariants: {
    variant: 'field'
  }
})

type SearchTriggerProps = VariantProps<typeof searchTriggerVariants> & { className?: string }

/** Header button that opens the ⌘K command menu (icon-only on small screens). */
const SearchTrigger = ({ variant, className }: SearchTriggerProps) => {
  const { setOpen } = useSearch()
  const isInline = variant === 'inline'

  return (
    <>
      <Button
        variant={isInline ? 'ghost' : 'outline'}
        className={cn(searchTriggerVariants({ variant }), className)}
        onClick={() => setOpen(true)}
        aria-keyshortcuts='Meta+K Control+K'
      >
        <SearchIcon data-icon='inline-start' />
        {isInline ? 'Type to search…' : 'Search…'}
        <Kbd className={isInline ? undefined : 'ms-auto'}>⌘K</Kbd>
      </Button>
      <Button
        variant='ghost'
        size='icon'
        className={isInline ? 'sm:hidden' : 'md:hidden'}
        onClick={() => setOpen(true)}
        aria-label='Search'
      >
        <SearchIcon />
      </Button>
    </>
  )
}

export default SearchTrigger
