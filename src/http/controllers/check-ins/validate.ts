import { FastifyReply, FastifyRequest } from 'fastify'
import { ResourceNotFound } from '../../../use-cases/errors/resource-not-found'
import { ValidateCheckInExpired } from '../../../use-cases/errors/validate-check-in-expired'
import { makeValidateCheckInUseCase } from '../../../use-cases/factories/check-ins/validate-check-in-use-case'
import { schemaValidateParams } from '../../../validators/check-ins/validate-zod'

const validate = async (request: FastifyRequest, reply: FastifyReply) => {
  const { checkInId } = schemaValidateParams.parse(request.params)

  try {
    const useCase = makeValidateCheckInUseCase()

    await useCase.execute({
      checkInId,
    })
  } catch (error) {
    if (
      error instanceof ResourceNotFound ||
      error instanceof ValidateCheckInExpired
    ) {
      return reply.status(400).send({ mes: error.message })
    }
  }

  return reply.status(200).send()
}

export { validate }
