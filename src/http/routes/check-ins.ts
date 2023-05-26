import { FastifyInstance } from 'fastify'
import { create } from '../controllers/check-ins/create'
import { history } from '../controllers/check-ins/history'
import { metrics } from '../controllers/check-ins/metrics'
import { validate } from '../controllers/check-ins/validate'
import { verifyJwt } from '../middlewares/verify-jwt'
import { verifyMemberIsActive } from '../middlewares/verify-member-is-active'
import { verifyRBA } from '../middlewares/verify-rba'

const checkInsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJwt)
  app.addHook('onRequest', verifyMemberIsActive)

  app.post('/gyms/:gymId/check-in', create)
  app.patch(
    '/check-in/:checkInId/validate',
    { onRequest: [verifyRBA('ADMIN')] },
    validate,
  )

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)
}

export { checkInsRoutes }
