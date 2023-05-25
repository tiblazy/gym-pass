import { makeUpdateMemberProfileUseCase } from '@/use-cases/factories/members/make-update-member-profile-use-case'
import { schemaUpdateProfile } from '@/validators/members/update-profile-zod'
import { FastifyReply, FastifyRequest } from 'fastify'

const updateProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password, email } = schemaUpdateProfile.parse(request.body)

  const useCase = makeUpdateMemberProfileUseCase()

  const { member } = await useCase.execute({
    id: request.user.sub,
    data: { username, password, email },
  })

  Reflect.deleteProperty(member, 'password')
  Reflect.deleteProperty(member, 'totp_key')

  return reply.status(200).send({ member })
}

export { updateProfile }
