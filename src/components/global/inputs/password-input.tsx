'use client'

// React Imports
import { useState } from 'react'
import type { ComponentProps } from 'react'

// Third-party Imports
import { EyeIcon, EyeOffIcon } from 'lucide-react'

// Component Imports
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'

type PasswordInputProps = Omit<ComponentProps<'input'>, 'type'>

/** Global: password field with a show / hide toggle. Spread react-hook-form `field` props onto it. */
const PasswordInput = ({ className, disabled, ...props }: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <InputGroup data-slot='password-input' className={className} data-disabled={disabled || undefined}>
      <InputGroupInput type={isVisible ? 'text' : 'password'} disabled={disabled} {...props} />
      <InputGroupAddon align='inline-end'>
        <InputGroupButton
          size='icon-xs'
          disabled={disabled}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
          onClick={() => setIsVisible(current => !current)}
        >
          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { PasswordInput }
export type { PasswordInputProps }
