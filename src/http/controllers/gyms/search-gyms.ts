import { makeSearchGymsUseCase } from '@/use-cases/factories/gyms/make-search-gyms-use-case'
import { schemaSearchGyms } from '@/validators/gyms/search-gyms-zod'
import { FastifyReply, FastifyRequest } from 'fastify'

const searchGyms = async (request: FastifyRequest, reply: FastifyReply) => {
  const { query, page } = schemaSearchGyms.parse(request.body)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    query,
    page,
  })

  return reply.status(200).send({ gyms })
}

export { searchGyms }
