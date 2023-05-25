import { makeUpdateMemberProfileUseCase } from '@/use-cases/factories/members/make-update-member-profile-use-case'
import { schemaUpdateProfileMember } from '@/validators/members/update-profile-member-zod'
import { FastifyReply, FastifyRequest } from 'fastify'

const updateProfileMember = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { username, email, password, avatar } = schemaUpdateProfileMember.parse(
    request.body,
  )

  const updateProfileMember = makeUpdateMemberProfileUseCase()
  const { member } = await updateProfileMember.execute({
    id: request.user.sub,
    data: { username, avatar, email, password },
  })

  Reflect.deleteProperty(member, 'password')
  return reply.status(200).send({ member })
}

export { updateProfileMember }
