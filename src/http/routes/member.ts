import { upload } from '@/utils/upload'
import { FastifyInstance } from 'fastify'
import { deactive } from '../controllers/members/deactive-profile'
import { getProfile } from '../controllers/members/get-profile'
import { register } from '../controllers/members/register'
import { updateProfile } from '../controllers/members/update-profile'
import { updateProfileAvatar } from '../controllers/members/update-profile-avatar'
import { validateTotp } from '../controllers/members/validate-totp'
import { verifyJwt } from '../middlewares/verify-jwt'
import { verifyMemberIsActive } from '../middlewares/verify-member-is-active'
import { refreshToken } from '../controllers/members/refresh-token'

const memberRoutes = async (app: FastifyInstance) => {
  app.post('/members', register)
  app.post('/token', validateTotp)
  app.patch('/token/refresh', refreshToken)

  app.get('/me', { onRequest: [verifyJwt, verifyMemberIsActive] }, getProfile)

  app.patch(
    '/me',
    { onRequest: [verifyJwt, verifyMemberIsActive] },
    updateProfile,
  )
  app.patch(
    '/me-deactive',
    { onRequest: [verifyJwt, verifyMemberIsActive] },
    deactive,
  )

  app.patch(
    '/avatar',
    { onRequest: [verifyJwt, verifyMemberIsActive, upload.single('avatar')] },
    updateProfileAvatar,
  )
}

export { memberRoutes }
