import { makeCreateGymUseCase } from '@/use-cases/factories/gyms/make-create-gym-use-case'
import { schemaCreate } from '@/validators/gyms/create-zod'
import { FastifyReply, FastifyRequest } from 'fastify'

const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, description, phone, latitude, longitude } = schemaCreate.parse(
    request.body,
  )

  const createUseCase = makeCreateGymUseCase()

  await createUseCase.execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}

export { create }
