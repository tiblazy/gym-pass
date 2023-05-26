import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJwt {
    user: {
      sub: string
      role: string
      is_active: boolean
    }
  }

  export { FastifyJwt }
}
