import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/gyms/make-fetch-nearby-gyms-use-case'
import { schemaNearbyGyms } from '@/validators/gyms/nearby-gyms-zod'
import { FastifyReply, FastifyRequest } from 'fastify'

const nearbyGyms = async (request: FastifyRequest, reply: FastifyReply) => {
  const { latitude, longitude } = schemaNearbyGyms.parse(request.body)

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    memberLatitude: latitude,
    memberLongitude: longitude,
  })

  return reply.status(200).send({ gyms })
}

export { nearbyGyms }
