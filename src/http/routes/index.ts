import { FastifyInstance } from 'fastify'
import { checkInsRoutes } from './check-ins'
import { gymsRoutes } from './gyms'
import { memberRoutes } from './member'
import { sesionsRoutes } from './sessions'

const routes = async (app: FastifyInstance) => {
  app.register(memberRoutes)
  app.register(gymsRoutes)
  app.register(checkInsRoutes)

  app.register(sesionsRoutes)
}

export { routes }
