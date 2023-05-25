import { z } from 'zod'

const schemaCreateGym = z.object({
  name: z.string(),
  description: z.string().optional(),
  phone: z.string().optional(),
  latitude: z.number().refine((value) => Math.abs(value) <= 90),
  longitude: z.number().refine((value) => Math.abs(value) <= 180),
})

export { schemaCreateGym }
