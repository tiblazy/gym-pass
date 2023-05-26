import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchNearbyGymsUseCase } from '../../../use-cases/factories/gyms/make-fetch-nearby-gyms-use-case'
import { schemaNearby } from '../../../validators/gyms/nearby-zod'

const nearby = async (request: FastifyRequest, reply: FastifyReply) => {
  const { latitude, longitude } = schemaNearby.parse(request.query)

  const useCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await useCase.execute({
    memberLatitude: latitude,
    memberLongitude: longitude,
  })

  return reply.status(200).send({ gyms })
}

export { nearby }
