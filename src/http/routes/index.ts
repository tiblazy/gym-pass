import { FastifyInstance } from 'fastify'
import { memberRoutes } from './member-routes'
import { sesionsRoutes } from './sessions-routes'

const routes = async (app: FastifyInstance) => {
  app.register(memberRoutes)
  app.register(sesionsRoutes)
}

export { routes }
