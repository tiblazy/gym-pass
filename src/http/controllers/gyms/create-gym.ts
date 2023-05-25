import { makeCreateGymUseCase } from '@/use-cases/factories/gyms/make-create-gym-use-case'
import { schemaCreateGym } from '@/validators/gyms/create-gym-zod'
import { FastifyReply, FastifyRequest } from 'fastify'

const createGym = async (request: FastifyRequest, reply: FastifyReply) => {
  const { latitude, longitude } = schemaCreateGym.parse(request.body)

  const createGymUseCase = makeCreateGymUseCase()

  const { gyms } = await createGymUseCase.execute({
    memberLatitude: latitude,
    memberLongitude: longitude,
  })

  return reply.status(200).send({ gyms })
}

export { createGym }
