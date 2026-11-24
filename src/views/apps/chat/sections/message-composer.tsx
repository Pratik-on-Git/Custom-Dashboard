'use client'

// React Imports
import { useState } from 'react'
import type { FormEvent } from 'react'

// Third-party Imports
import { ImagePlusIcon, PaperclipIcon, PlusIcon, SendIcon } from 'lucide-react'

// Component Imports
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'

type MessageComposerProps = {
  onSend: (text: string) => void
  recipient: string
}

const MessageComposer = ({ onSend, recipient }: MessageComposerProps) => {
  const [text, setText] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!text.trim()) return
    onSend(text.trim())
    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup className='h-11'>
        <InputGroupAddon>
          <InputGroupButton size='icon-sm' aria-label='Add'>
            <PlusIcon />
          </InputGroupButton>
          <InputGroupButton size='icon-sm' aria-label='Attach image' className='max-sm:hidden'>
            <ImagePlusIcon />
          </InputGroupButton>
          <InputGroupButton size='icon-sm' aria-label='Attach file' className='max-sm:hidden'>
            <PaperclipIcon />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupInput
          value={text}
          onChange={event => setText(event.target.value)}
          placeholder={`Message ${recipient}…`}
          aria-label='Message'
        />
        <InputGroupAddon align='inline-end'>
          <InputGroupButton type='submit' variant='default' size='icon-sm' aria-label='Send' disabled={!text.trim()}>
            <SendIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}

export default MessageComposer
