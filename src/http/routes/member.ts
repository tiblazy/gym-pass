import { FastifyInstance } from 'fastify'
import { upload } from '../../utils/upload'
import { deactive } from '../controllers/members/deactive-profile'
import { fetch } from '../controllers/members/fetch'
import { getProfile } from '../controllers/members/get-profile'
import { refreshToken } from '../controllers/members/refresh-token'
import { register } from '../controllers/members/register'
import { updateProfile } from '../controllers/members/update-profile'
import { updateProfileAvatar } from '../controllers/members/update-profile-avatar'
import { validateTotp } from '../controllers/members/validate-totp'
import { verifyJwt } from '../middlewares/verify-jwt'
import { verifyMemberIsActive } from '../middlewares/verify-member-is-active'

const memberRoutes = async (app: FastifyInstance) => {
  app.post('/members', register)
  app.post('/token', validateTotp)
  app.patch('/token/refresh', refreshToken)

  app.get('/members', { onRequest: [verifyJwt, verifyMemberIsActive] }, fetch)
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
