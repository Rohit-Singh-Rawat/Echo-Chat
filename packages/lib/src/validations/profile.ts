import * as z from 'zod'

export const updateProfileSchema = z
  .object({
    name: z.string().min(1).optional(),
    image: z.string().url().optional(),
  })
  .refine((data) => data.name || data.image, {
    message: 'At least one field (name or image) must be provided',
  })
