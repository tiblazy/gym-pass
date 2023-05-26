import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { ResourceNotFound } from '../../../use-cases/errors/resource-not-found'
import { TotpAlreadyExpired } from '../../../use-cases/errors/totp-already-expired'
import { makeValidateMemberTotpUseCase } from '../../../use-cases/factories/members/make-validate-member-totp-use-case'
import { schemaValidateTotpMember } from '../../../validators/members/validate-totp-zod'

const validateTotp = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const useCase = makeValidateMemberTotpUseCase()

    const { totp } = schemaValidateTotpMember.parse(request.body)

    const { member } = await useCase.execute({ totpKey: totp })

    return reply.send({
      welcome: `${member.username} membership validate, welcome.`,
    })
  } catch (error) {
    if (error instanceof TotpAlreadyExpired) {
      return reply.status(400).send({
        error: error.message,
        message: 'A new one will be send in a few minutes',
      })
    }

    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({
        error: error.message,
      })
    }

    if (error instanceof ZodError) {
      return reply
        .status(400)
        .send({ message: 'Validation Error', issues: error.format() })
    }
  }
}

export { validateTotp }
