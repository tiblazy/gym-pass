import { FastifyInstance } from 'fastify'
import { create } from '../controllers/gyms/create'
import { nearby } from '../controllers/gyms/nearby'
import { search } from '../controllers/gyms/search'
import { verifyJwt } from '../middlewares/verify-jwt'
import { verifyMemberIsActive } from '../middlewares/verify-member-is-active'

const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJwt)
  app.addHook('onRequest', verifyMemberIsActive)

  app.post('/gym', create)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}

export { gymsRoutes }
