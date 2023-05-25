import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import mailer from 'fastify-mailer'
import totp from 'fastify-totp'
import { fastifyJwtOptions } from './configs/jwt'
import { fastifyMailerOptions } from './configs/mailer'
import { errorHandler } from './http/error-handler'
import { routes } from './http/routes'

const app = fastify()

app.register(mailer, fastifyMailerOptions)
app.register(totp)
app.register(fastifyJwt, fastifyJwtOptions)

app.register(routes)

app.setErrorHandler(errorHandler)

export { app }
