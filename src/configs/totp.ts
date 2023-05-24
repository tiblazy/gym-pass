import { app } from 'src/app'

const totp = () => {
  const { totp } = app

  const totpKey = totp.generateSecret(5).ascii.toUpperCase()

  return totpKey
}

export { totp }
