import { env } from './env'

const fastifyJwtOptions = {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: env.COOKIE_NAME,
    signed: false,
  },
  sign: { expiresIn: '15m' },
}

export { fastifyJwtOptions }
