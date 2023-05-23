import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { env } from 'src/configs/env'
import { ZodError } from 'zod'

const errorHandler = (
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  return reply.status(500).send()
}

export { errorHandler }
