import { FastifyReply, FastifyRequest } from 'fastify'

const verifyRBA = (rbaToVerify: 'ADMIN' | 'MEMBER') => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== rbaToVerify) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}

export { verifyRBA }
