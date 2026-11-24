// Third-party Imports
import { toast } from 'sonner'

/** Stand-in for a network call in the demo pages. */
export const simulateRequest = (ms = 1200) => new Promise<void>(resolve => setTimeout(resolve, ms))

/** Demo helper: shows submitted form values as formatted JSON in a toast (replace with a real API call). */
export const showSubmittedData = (data: unknown, title = 'You submitted the following values:') => {
  toast.message(title, {
    description: (
      <pre className='bg-muted text-foreground mt-2 max-h-72 w-full overflow-auto rounded-md p-3 font-mono text-xs'>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    )
  })
}

/** Plural helper for toast copy: (3, 'task') → "3 tasks" */
export const pluralize = (count: number, noun: string) => `${count} ${noun}${count === 1 ? '' : 's'}`
