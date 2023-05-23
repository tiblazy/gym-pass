import { FastifyInstance } from 'fastify'
import { memberRoutes } from './member-routes'

const routes = async (app: FastifyInstance) => {
  app.register(memberRoutes)
}

export { routes }
