import fastify from 'fastify'
import { errorHandler } from './http/error-handler'
import { routes } from './http/routes'

export const app = fastify()

app.register(routes)

app.setErrorHandler(errorHandler)
