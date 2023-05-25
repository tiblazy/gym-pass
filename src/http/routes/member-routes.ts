import { FastifyInstance } from 'fastify'
import { getProfileMember } from '../controllers/members/get-profile-member'
import { registerMember } from '../controllers/members/register-member'
import { validateMember } from '../controllers/members/validate-member'
import { verifyJwt } from '../middlewares/verify-jwt'
import { verifyMemberIsActive } from '../middlewares/verify-member-is-active'

const memberRoutes = async (app: FastifyInstance) => {
  app.post('/members', registerMember)
  app.post('/token', validateMember)

  app.get(
    '/me',
    { onRequest: [verifyJwt, verifyMemberIsActive] },
    getProfileMember,
  )

  // app.post('/members/{id}', validateMember) update member
}

export { memberRoutes }
