import fastify from 'fastify'
import { errorHandler } from './http/error-handler'

export const app = fastify()

app.setErrorHandler(errorHandler)
