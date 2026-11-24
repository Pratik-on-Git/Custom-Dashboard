'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { CheckIcon, XIcon } from 'lucide-react'

// Type Imports
import type { ChatContact } from '@/types/apps/chat-types'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Identity } from '@/components/global/micro/identity'

// Util Imports
import { toInitials } from '@/utils/format-utils'

type NewChatDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  contacts: ChatContact[]

  /** Called with the chosen recipients */
  onStart: (contacts: ChatContact[]) => void
}

/** Pick one or more people to message — searchable multi-select with removable chips. */
const NewChatDialog = ({ open, onOpenChange, contacts, onStart }: NewChatDialogProps) => {
  const [selected, setSelected] = useState<ChatContact[]>([])

  const toggle = (contact: ChatContact) =>
    setSelected(current =>
      current.some(item => item.id === contact.id)
        ? current.filter(item => item.id !== contact.id)
        : [...current, contact]
    )

  const handleOpenChange = (next: boolean) => {
    if (!next) setSelected([])
    onOpenChange(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>New message</DialogTitle>
          <DialogDescription>Choose who to message.</DialogDescription>
        </DialogHeader>

        <div className='flex min-h-7 flex-wrap items-center gap-1.5'>
          <span className='text-muted-foreground text-sm'>To:</span>
          {selected.map(contact => (
            <Badge key={contact.id} variant='secondary' className='gap-1 pe-1'>
              {contact.fullName}
              <button
                type='button'
                onClick={() => toggle(contact)}
                aria-label={`Remove ${contact.fullName}`}
                className='hover:bg-foreground/10 focus-visible:ring-ring/50 rounded-full p-0.5 outline-none focus-visible:ring-2'
              >
                <XIcon className='size-3' />
              </button>
            </Badge>
          ))}
        </div>

        <Command className='rounded-lg border'>
          <CommandInput placeholder='Search people…' />
          <CommandList className='max-h-72'>
            <CommandEmpty>No people found.</CommandEmpty>
            <CommandGroup>
              {contacts.map(contact => (
                <CommandItem
                  key={contact.id}
                  value={`${contact.fullName} ${contact.username}`}
                  onSelect={() => toggle(contact)}
                >
                  <Identity
                    size='sm'
                    name={contact.fullName}
                    initials={toInitials(contact.fullName)}
                    imageUrl={contact.avatar}
                    description={`@${contact.username}`}
                  />
                  {selected.some(item => item.id === contact.id) && <CheckIcon className='ms-auto' />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>

        <DialogFooter>
          <Button
            disabled={!selected.length}
            onClick={() => {
              onStart(selected)
              handleOpenChange(false)
            }}
          >
            Start chat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewChatDialog
