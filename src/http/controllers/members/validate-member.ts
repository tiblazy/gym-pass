import { FastifyReply, FastifyRequest } from 'fastify'
import { TotpAlreadyExpired } from 'src/use-cases/errors/totp-already-expired'
import { TotpResend } from 'src/use-cases/errors/totp-resend'
import { makeValidateMemberTotpUseCase } from 'src/use-cases/factories/make-validate-member-totp-use-case'
import { schemaValidateTotpMember } from 'src/validators/members/validate-totp-zod'

const validateMember = async (request: FastifyRequest, reply: FastifyReply) => {
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
    if (error instanceof TotpAlreadyExpired || error instanceof TotpResend) {
      return reply.status(400).send({ message: error.message })
    }
  }
}

export { validateMember }
