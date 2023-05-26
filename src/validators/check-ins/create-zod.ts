import { z } from 'zod'

const schemaCreateParams = z.object({
  gymId: z.string(),
})

const schemaCreateBody = z.object({
  latitude: z.number().refine((value) => Math.abs(value) <= 90),
  longitude: z.number().refine((value) => Math.abs(value) <= 180),
})

export { schemaCreateBody, schemaCreateParams }
