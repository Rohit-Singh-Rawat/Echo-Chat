import * as z from 'zod'

export const createRoomSchema = z.object({
  name: z.string().min(1, 'Room name is required'),
  isTemporary: z.boolean().default(true),
  maxTimeLimit: z.number().min(1, 'Time limit must be at least 1 minute'),
  maxUsers: z
    .number()
    .min(2, 'Room must allow at least 2 users')
    .max(200, 'Maximum 200 users allowed'),
})

export type CreateRoomInput = z.infer<typeof createRoomSchema>
