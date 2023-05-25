import { z } from 'zod'

const schemaSearch = z.object({
  query: z.string(),
  page: z.coerce.number().min(1).default(1),
})

export { schemaSearch }
