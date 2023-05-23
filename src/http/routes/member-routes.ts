import { FastifyInstance } from 'fastify'
import { registerMember } from '../controllers/members/register-member'

const memberRoutes = async (app: FastifyInstance) => {
  app.post('/members', registerMember)
}

export { memberRoutes }
