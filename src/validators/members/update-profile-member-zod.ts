import { z } from 'zod'

const schemaUpdateProfileMember = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  avatar: z.string().optional(),
})

export { schemaUpdateProfileMember }
