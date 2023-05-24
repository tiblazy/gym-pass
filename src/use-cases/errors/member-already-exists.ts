class MemberAlreadyExists extends Error {
  constructor() {
    super('Email already exists.')
  }
}

export { MemberAlreadyExists }
