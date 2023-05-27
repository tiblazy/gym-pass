import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import cloudinary from 'fastify-cloudinary'
import mailer from 'fastify-mailer'
import multer from 'fastify-multer'
import totp from 'fastify-totp'
import path from 'path'
import { fastifyCloudinaryOptions } from './configs/cloudinary'
import { env } from './configs/env'
import { fastifyJwtOptions } from './configs/jwt'
import { fastifyMailerOptions } from './configs/mailer'
import { errorHandler } from './http/error-handler'
import { routes } from './http/routes'

const app = fastify()

let pathOpenApi = path.join(__dirname, 'docs', 'openapi.json')
if (env.NODE_ENV === 'production') {
  pathOpenApi = path.join(__dirname, 'openapi.json')
}
console.log(__dirname)

app.register(mailer, fastifyMailerOptions)
app.register(totp)

app.register(fastifyJwt, fastifyJwtOptions)
app.register(fastifyCookie)

app.register(multer.contentParser)
app.register(cloudinary, fastifyCloudinaryOptions)

app.register(fastifySwagger, {
  mode: 'static',
  specification: { path: pathOpenApi, baseDir: path.join(__dirname, 'docs') },
})

app.register(fastifySwaggerUi, {
  baseDir: path.join(__dirname, 'docs'),
  routePrefix: '/docs',
  staticCSP: true,
})

app.register(routes)

app.setErrorHandler(errorHandler)

export { app }
