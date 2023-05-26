import { FastifyReply, FastifyRequest } from 'fastify'
import { schemaAuthenticate } from '../../../validators/sessions/authenticate-zod'
import { PrismaMembersRepository } from '../../../repositories/prisma/prisma-members-repository'
import { SessionAuthenticateUseCase } from '../../../use-cases/sessions/authenticate'
import { InvalidCredentials } from '../../../use-cases/errors/invalid-credentials'

const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = schemaAuthenticate.parse(request.body)

  try {
    const membersRepository = new PrismaMembersRepository()
    const useCase = new SessionAuthenticateUseCase(membersRepository)

    const { member } = await useCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      { role: member.role, is_active: member.is_active },
      { sign: { sub: member.id } },
    )

    const refreshToken = await reply.jwtSign(
      { is_active: member.is_active },
      { sign: { sub: member.id, expiresIn: '7d' } },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentials) {
      return reply.status(400).send({ message: error.message })
    }
  }
}

export { authenticate }
