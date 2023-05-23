import fastify from 'fastify'
import mailer from 'fastify-mailer'
import totp from 'fastify-totp'
import { fastifyMailerOptions } from './configs/mailer'
import { errorHandler } from './http/error-handler'
import { routes } from './http/routes'

export const app = fastify()

app.register(mailer, fastifyMailerOptions)
app.register(totp)
app.register(routes)

app.setErrorHandler(errorHandler)
