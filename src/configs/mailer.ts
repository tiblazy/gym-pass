import { FastifyMailerDTO } from '../dtos/mailer-dto'
import { env } from './env'

const fastifyMailerOptions = ({
  sender,
  host,
  port,
  secure,
}: FastifyMailerDTO) => {
  return {
    defaults: {
      from:
        sender ?? env.NODE_ENV === 'development'
          ? env.SMTP_USER_DEVELOPMENT
          : env.SMTP_USER_PRODUCTION,
    },
    transport: {
      host: host ?? 'smtp-mail.outlook.com',
      port: port ?? 587,
      secure: secure ?? false,
      auth: {
        user:
          env.NODE_ENV === 'development'
            ? env.SMTP_USER_DEVELOPMENT
            : env.SMTP_USER_PRODUCTION,
        pass:
          env.NODE_ENV === 'development'
            ? env.SMTP_PASS_DEVELOPMENT
            : env.SMTP_PASS_PRODUCTION,
      },
    },
  }
}

export { fastifyMailerOptions }
