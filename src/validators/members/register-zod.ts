import { z } from 'zod'

const schemaRegisterMember = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  avatar: z.string().optional(),
})

export { schemaRegisterMember }
