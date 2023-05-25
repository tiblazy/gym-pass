import { z } from 'zod'

const schemaAuthenticate = z.object({
  email: z.string().email(),
  password: z.string(),
})

export { schemaAuthenticate }
