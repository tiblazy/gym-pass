import { z } from 'zod'

const schemaRegister = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  avatar: z.string().optional(),
})

export { schemaRegister }
