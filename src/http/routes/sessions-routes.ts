import { FastifyInstance } from 'fastify'
import { sessionAuthenticate } from '../controllers/sessions/authenticate-sessions'

const sesionsRoutes = async (app: FastifyInstance) => {
  app.get('/authenticate', sessionAuthenticate)
}

export { sesionsRoutes }
