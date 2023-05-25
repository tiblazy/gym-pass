import { upload } from '@/utils/upload'
import { FastifyInstance } from 'fastify'
import { deactiveMember } from '../controllers/members/deactive-profile-member'
import { getProfileMember } from '../controllers/members/get-profile-member'
import { registerMember } from '../controllers/members/register-member'
import { updateProfileMember } from '../controllers/members/update-profile-member'
import { updateProfileMemberAvatar } from '../controllers/members/update-profile-member-avatar'
import { validateMember } from '../controllers/members/validate-member'
import { verifyJwt } from '../middlewares/verify-jwt'
import { verifyMemberIsActive } from '../middlewares/verify-member-is-active'

const memberRoutes = async (app: FastifyInstance) => {
  app.post('/members', registerMember)
  app.post('/token', validateMember)

  app.addHook('onRequest', verifyJwt)
  app.addHook('onRequest', verifyMemberIsActive)

  app.get('/me', getProfileMember)
  app.patch('/me', updateProfileMember)
  app.patch('/me-deactive', deactiveMember)

  app.addHook('onRequest', upload.single('avatar'))

  app.patch('/avatar', updateProfileMemberAvatar)
}

export { memberRoutes }
