import { FastifyReply, FastifyRequest } from 'fastify'
import fs from 'fs'
import { promisify } from 'util'
import { makeUpdateMemberProfileUseCase } from '../../../use-cases/factories/members/make-update-member-profile-use-case'

const unlinkAsync = promisify(fs.unlink)

const updateProfileAvatar = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { file } = request

    const useCase = makeUpdateMemberProfileUseCase()

    const { member } = await useCase.execute({
      id: request.user.sub,
      data: { avatar: file },
    })

    await unlinkAsync(file.path)

    Reflect.deleteProperty(member, 'password')
    Reflect.deleteProperty(member, 'totp_key')

    return reply.status(200).send({ member })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({
        message: 'Validation Error',
        issues: {
          avatar: {
            _errors: ['Required'],
          },
        },
      })
    }
  }
}

export { updateProfileAvatar }
