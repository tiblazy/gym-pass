import { FastifyInstance } from 'fastify'
import { sessionAuthenticate } from '../controllers/sessions/authenticate-sessions'

const sesionsRoutes = async (app: FastifyInstance) => {
  app.post('/authenticate', sessionAuthenticate)
}

export { sesionsRoutes }
