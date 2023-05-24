import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaMembersRepository } from 'src/repositories/prisma/prisma-members-repository'
import { TotpAlreadyExpired } from 'src/use-cases/errors/totp-already-expired'
import { TotpResend } from 'src/use-cases/errors/totp-resend'
import { ValidateUseCase } from 'src/use-cases/member/validate-use-case'
import { schemaValidateTotpMember } from 'src/validators/members/validate-totp-zod'

const validateMember = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const membersRepository = new PrismaMembersRepository()
    const validateUseCase = new ValidateUseCase(membersRepository)

    const { totp } = schemaValidateTotpMember.parse(request.body)

    const member = await validateUseCase.execute(totp)

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
