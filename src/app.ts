import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import cloudinary from 'fastify-cloudinary'
import mailer from 'fastify-mailer'
import multer from 'fastify-multer'
import totp from 'fastify-totp'
import { fastifyCloudinaryOptions } from './configs/cloudinary'
import { fastifyJwtOptions } from './configs/jwt'
import { fastifyMailerOptions } from './configs/mailer'
import { errorHandler } from './http/error-handler'
import { routes } from './http/routes'

const app = fastify()

app.register(mailer, fastifyMailerOptions)
app.register(totp)
app.register(fastifyJwt, fastifyJwtOptions)
app.register(fastifyCookie)
app.register(multer.contentParser)
app.register(cloudinary, fastifyCloudinaryOptions)

app.register(routes)

app.setErrorHandler(errorHandler)

export { app }
