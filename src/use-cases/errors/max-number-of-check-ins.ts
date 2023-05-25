class MaxNumberOfCheckIns extends Error {
  constructor(public max: number = 1) {
    super(`Max number of check-ins reached, ${max}.`)
  }
}

export { MaxNumberOfCheckIns }
