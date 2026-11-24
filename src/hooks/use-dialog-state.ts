'use client'

// React Imports
import { useState } from 'react'

/**
 * Tracks which of a feature's dialogs is open, plus the row it acts on.
 * @example const dialogs = useDialogState<'create' | 'edit' | 'delete', Task>()
 *          dialogs.open('edit', task) · dialogs.is('edit') · dialogs.close()
 */
export const useDialogState = <TDialog extends string, TItem = never>() => {
  const [state, setState] = useState<{ dialog: TDialog | null; item: TItem | null }>({ dialog: null, item: null })

  return {
    dialog: state.dialog,
    item: state.item,
    is: (dialog: TDialog) => state.dialog === dialog,
    open: (dialog: TDialog, item: TItem | null = null) => setState({ dialog, item }),

    /** Closes the dialog but keeps the item, so content doesn't vanish during the exit animation */
    close: () => setState(current => ({ ...current, dialog: null }))
  }
}
