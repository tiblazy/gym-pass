import 'dotenv/config'
import { schema } from '../validators/env-zod'

const envSchema = schema

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
