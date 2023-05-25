import { FastifyInstance } from 'fastify'
import { authenticate } from '../controllers/sessions/authenticate'

const sesionsRoutes = async (app: FastifyInstance) => {
  app.post('/authenticate', authenticate)
}

export { sesionsRoutes }
