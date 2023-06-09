import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetMemberProfileUseCase } from '../../../use-cases/factories/members/make-get-member-profile-use-case'

const getProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  const useCase = makeGetMemberProfileUseCase()
  const { member } = await useCase.execute({
    id: request.user.sub,
  })

  Reflect.deleteProperty(member, 'password')
  Reflect.deleteProperty(member, 'totp_key')

  return reply.status(200).send({ member })
}

export { getProfile }
