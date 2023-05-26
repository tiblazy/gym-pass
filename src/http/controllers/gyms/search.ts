import { prisma } from '@/configs/prisma'
import { makeSearchGymsUseCase } from '@/use-cases/factories/gyms/make-search-gyms-use-case'
import { schemaSearch } from '@/validators/gyms/search-zod'
import { FastifyReply, FastifyRequest } from 'fastify'

const search = async (request: FastifyRequest, reply: FastifyReply) => {
  const { query, page } = schemaSearch.parse(request.query)

  const searchUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchUseCase.execute({
    query,
    page,
  })

  return reply.status(200).send({ gyms })
}

export { search }
