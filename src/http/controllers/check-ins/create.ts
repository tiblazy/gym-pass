import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCheckInUseCase } from '../../../use-cases/factories/check-ins/make-make-check-in-use-case'
import {
  schemaCreateBody,
  schemaCreateParams,
} from '../../../validators/check-ins/create-zod'

const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { gymId } = schemaCreateParams.parse(request.params)
  const { latitude, longitude } = schemaCreateBody.parse(request.body)

  const useCase = makeCheckInUseCase()

  await useCase.execute({
    memberId: request.user.sub,
    gymId,
    memberLatitude: latitude,
    memberLongitude: longitude,
  })

  return reply.status(201).send()
}

export { create }
