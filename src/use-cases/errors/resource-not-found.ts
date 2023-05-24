class ResourceNotFound extends Error {
  constructor(public resource: string) {
    super(`${resource} not found.`)
  }
}

export { ResourceNotFound }
