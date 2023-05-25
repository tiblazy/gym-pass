import { makeUpdateMemberProfileUseCase } from '@/use-cases/factories/members/make-update-member-profile-use-case'
import { schemaUpdateProfileMember } from '@/validators/members/update-profile-member-zod'
import { FastifyReply, FastifyRequest } from 'fastify'

const updateProfileMember = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { username, password, email } = schemaUpdateProfileMember.parse(
    request.body,
  )

  const useCase = makeUpdateMemberProfileUseCase()

  const { member } = await useCase.execute({
    id: request.user.sub,
    data: { username, password, email },
  })

  Reflect.deleteProperty(member, 'password')
  Reflect.deleteProperty(member, 'totp_key')

  return reply.status(200).send({ member })
}

export { updateProfileMember }
