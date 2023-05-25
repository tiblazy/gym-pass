import { FastifyInstance } from 'fastify'
import { gymsRoutes } from './gyms'
import { memberRoutes } from './member'
import { sesionsRoutes } from './sessions'

const routes = async (app: FastifyInstance) => {
  app.register(memberRoutes)
  app.register(gymsRoutes)
  app.register(sesionsRoutes)
}

export { routes }
