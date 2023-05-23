import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from 'src/configs/prisma'
import { schemaRegisterMember } from 'src/validators/members/register-zod'

const registerMember = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = schemaRegisterMember

  await prisma.memberaxios.create(data)

  return reply.send()
}

export { registerMember }
