class NotActive extends Error {
  constructor() {
    super('Member is inactive, try get a new token and active your account.')
  }
}

export { NotActive }
