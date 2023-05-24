import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaMembersRepository } from 'src/repositories/prisma/prisma-members-repository'
import { InvalidCredentials } from 'src/use-cases/errors/invalid-credentials'
import { SessionAuthenticateUseCase } from 'src/use-cases/sessions/session-authenticate'
import { schemaSessionAuthenticate } from 'src/validators/sessions/authenticate-zod'

const sessionAuthenticate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { email, password } = schemaSessionAuthenticate.parse(request.body)

  try {
    const membersRepository = new PrismaMembersRepository()
    const sessionAuthenticateUseCase = new SessionAuthenticateUseCase(
      membersRepository,
    )

    await sessionAuthenticateUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentials) {
      return reply.status(400).send({ message: error.message })
    }
  }

  return reply.status(200).send()
}

export { sessionAuthenticate }
