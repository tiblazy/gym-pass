import { z } from 'zod'

const schemaHistoryQuery = z.object({
  page: z.coerce.number().min(1).default(1),
})

export { schemaHistoryQuery }
