import { z } from 'zod'

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number().default(3000),

  JWT_SECRET: z.string(),
  COOKIE_NAME: z.string(),

  SMTP_USER_DEVELOPMENT: z.string().optional(),
  SMTP_PASS_DEVELOPMENT: z.string().optional(),

  SMTP_USER_PRODUCTION: z.string().optional(),
  SMTP_PASS_PRODUCTION: z.string().optional(),

  DATABASE_URL: z.string(),
  CLOUDINARY_URL: z.string(),
})

export { schema }
