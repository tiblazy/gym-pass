import { FastifyInstance } from 'fastify'
import { createGym } from '../controllers/gyms/create-gym'
import { nearbyGyms } from '../controllers/gyms/nearby-gyms'
import { searchGyms } from '../controllers/gyms/search-gyms'
import { verifyJwt } from '../middlewares/verify-jwt'
import { verifyMemberIsActive } from '../middlewares/verify-member-is-active'

const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJwt)
  app.addHook('onRequest', verifyMemberIsActive)

  app.post('/gym', createGym)

  app.get('/gyms/search', searchGyms)
  app.get('/gyms/nearby', nearbyGyms)
}

export { gymsRoutes }
