import { makeFetchMemberCheckInUseCase } from '@/use-cases/factories/check-ins/make-fetch-members-check-ins-history-use-case'
import { schemaHistoryQuery } from '@/validators/check-ins/history-zod'
import { FastifyReply, FastifyRequest } from 'fastify'

const history = async (request: FastifyRequest, reply: FastifyReply) => {
  const { page } = schemaHistoryQuery.parse(request.query)

  const useCase = makeFetchMemberCheckInUseCase()

  const { checkIns } = await useCase.execute({
    memberId: request.user.sub,
    page,
  })

  return reply.status(200).send({ checkIns })
}

export { history }
