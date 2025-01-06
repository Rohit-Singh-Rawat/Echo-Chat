import { createSafeActionClient } from 'next-safe-action'

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error('Action error:', e.message)
    if (e instanceof Error) {
      return e.message
    }
    return 'Oh no, something went wrong!'
  },
})
