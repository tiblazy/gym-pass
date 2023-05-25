import { makeGetMemberProfileUseCase } from '@/use-cases/factories/members/make-get-member-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

const getProfileMember = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const getProfileMember = makeGetMemberProfileUseCase()
  const { member } = await getProfileMember.execute({
    id: request.user.sub,
  })

  Reflect.deleteProperty(member, 'password')
  return reply.status(200).send(member)
}

export { getProfileMember }
