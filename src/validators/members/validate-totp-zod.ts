import { z } from 'zod'

const schemaValidateTotpMember = z.object({
  totp: z.string(),
})

export { schemaValidateTotpMember }
