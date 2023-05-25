import { NotActive } from '@/use-cases/errors/not-active'
import { FastifyReply, FastifyRequest } from 'fastify'

const verifyMemberIsActive = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const doesMemberActive = await request.user.is_active

    if (!doesMemberActive) {
      throw new NotActive()
    }
  } catch (error) {
    if (error instanceof NotActive) {
      return reply.status(400).send({ message: error.message })
    }
  }
}

export { verifyMemberIsActive }
