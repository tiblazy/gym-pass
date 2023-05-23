import { FastifyError, FastifyReply, FastifyRequest } from "fastify"
import { ZodError } from "zod"
import { env } from "./config/env"

export const errorHandler=(error: FastifyError, _: FastifyRequest, reply: FastifyReply)=>{
  if (error istanceof ZodError){
    return reply.status(400).send({message: "Validation Error", issues: error.format()})
  }

  if(env.NODE_ENV !== "production"){
    console.log(error)
  }

  return reply.status(500).send()
}