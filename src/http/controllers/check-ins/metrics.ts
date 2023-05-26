import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetMemberMetricsCheckInUseCase } from '../../../use-cases/factories/check-ins/make-get-members-metrics-use-case'

const metrics = async (request: FastifyRequest, reply: FastifyReply) => {
  const useCase = makeGetMemberMetricsCheckInUseCase()

  const count = await useCase.execute({
    memberId: request.user.sub,
  })

  return reply.status(200).send({ checkIns: count })
}

export { metrics }
