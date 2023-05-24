class TotpAlreadyExpired extends Error {
  constructor(public path: string) {
    super(`Totp from ${path} already expired.`)
  }
}

export { TotpAlreadyExpired }
