import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../configs/prisma'

const fetch = async (request: FastifyRequest, reply: FastifyReply) => {
  const members = await prisma.member.findMany()

  return reply.send({ members })
}

export { fetch }
