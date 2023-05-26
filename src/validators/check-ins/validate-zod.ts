import { z } from 'zod'

const schemaValidateParams = z.object({
  checkInId: z.string(),
})

export { schemaValidateParams }
