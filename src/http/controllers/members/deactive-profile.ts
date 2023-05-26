import { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeactiveMemberProfileUseCase } from '../../../use-cases/factories/members/make-desactive-member-profile-use-case'

const deactive = async (request: FastifyRequest, reply: FastifyReply) => {
  const deactMemberProfile = makeDeactiveMemberProfileUseCase()

  await deactMemberProfile.execute({
    id: request.user.sub,
  })

  return reply.status(204).send()
}

export { deactive }
