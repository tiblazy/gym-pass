import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJwt {
    user: {
      sub: string
      is_active: boolean
      role?: string
    }
  }

  export { FastifyJwt }
}
