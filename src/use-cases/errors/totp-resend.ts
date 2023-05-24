class TotpResend extends Error {
  constructor(public totpKey: string) {
    super(`A new totp will be send in a few minutes. ${totpKey}`)
  }
}

export { TotpResend }
