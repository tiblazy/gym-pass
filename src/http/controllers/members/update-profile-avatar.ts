import { makeUpdateMemberProfileUseCase } from '@/use-cases/factories/members/make-update-member-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import fs from 'fs'
import { promisify } from 'util'

const unlinkAsync = promisify(fs.unlink)

const updateProfileMemberAvatar = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
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
}

export { updateProfileMemberAvatar }
