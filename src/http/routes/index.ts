import { FastifyInstance } from 'fastify'
import { gymsRoutes } from './gyms-routes'
import { memberRoutes } from './member-routes'
import { sesionsRoutes } from './sessions-routes'

const routes = async (app: FastifyInstance) => {
  app.register(memberRoutes)
  app.register(gymsRoutes)
  app.register(sesionsRoutes)
}

export { routes }
