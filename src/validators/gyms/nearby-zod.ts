import { z } from 'zod'

const schemaNearbyGyms = z.object({
  latitude: z.number().refine((value) => Math.abs(value) <= 90),
  longitude: z.number().refine((value) => Math.abs(value) <= 180),
})

export { schemaNearbyGyms }
