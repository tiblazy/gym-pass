import { z } from 'zod'

const schemaSearchGyms = z.object({
  query: z.string(),
  page: z.coerce.number().min(1).default(1),
})

export { schemaSearchGyms }
