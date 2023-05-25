import { env } from './env'

const fastifyCloudinaryOptions = {
  url: env.CLOUDINARY_URL,
}

export { fastifyCloudinaryOptions }
