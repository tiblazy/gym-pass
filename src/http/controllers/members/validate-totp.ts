import { TotpAlreadyExpired } from '@/use-cases/errors/totp-already-expired'
import { makeValidateMemberTotpUseCase } from '@/use-cases/factories/members/make-validate-member-totp-use-case'
import { schemaValidateTotpMember } from '@/validators/members/validate-totp-zod'
import { FastifyReply, FastifyRequest } from 'fastify'

const validateTotp = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const useCase = makeValidateMemberTotpUseCase()

    const { totp } = schemaValidateTotpMember.parse(request.body)

    const { member } = await useCase.execute({ totpKey: totp })

    if (member) {
      return reply.send({
        welcome: `${member.username} membership validate, welcome.`,
      })
    }
  } catch (error) {
    if (error instanceof TotpAlreadyExpired) {
      return reply.status(400).send({
        error: error.message,
        message: 'A new one will be send in a few minutes',
      })
    }
  }
}

export { validateTotp }
