import { z } from 'zod'

const schemaUpdateProfile = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
})

export { schemaUpdateProfile }
