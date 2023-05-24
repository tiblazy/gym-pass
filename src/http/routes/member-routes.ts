import { FastifyInstance } from 'fastify'
import { registerMember } from '../controllers/members/register-member'
import { validateMember } from '../controllers/members/validate-member'

const memberRoutes = async (app: FastifyInstance) => {
  app.post('/members', registerMember)
  app.post('/members/validate', validateMember)
  // app.post('/members/{id}', validateMember) update member

  // app.post('/me', validateMember) profile member
}

export { memberRoutes }
