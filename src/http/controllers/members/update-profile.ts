import { FastifyReply, FastifyRequest } from 'fastify'
import { schemaUpdateProfile } from '../../../validators/members/update-profile-zod'
import { makeUpdateMemberProfileUseCase } from '../../../use-cases/factories/members/make-update-member-profile-use-case'

const updateProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { username, password, email } = schemaUpdateProfile.parse(
      request.body,
    )

    if (
      username === undefined &&
      password === undefined &&
      email === undefined
    ) {
      throw new Error(
        'At least one property must be send, [username, password, email ]',
      )
    }

    const useCase = makeUpdateMemberProfileUseCase()

    const { member } = await useCase.execute({
      id: request.user.sub,
      data: { username, password, email },
    })

    Reflect.deleteProperty(member, 'password')
    Reflect.deleteProperty(member, 'totp_key')

    return reply.status(200).send({ member })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ error: error.message })
    }
  }
}

export { updateProfile }
