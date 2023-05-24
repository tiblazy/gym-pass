import { z } from 'zod'

const schemaSessionAuthenticate = z.object({
  email: z.string().email(),
  password: z.string(),
})

export { schemaSessionAuthenticate }
