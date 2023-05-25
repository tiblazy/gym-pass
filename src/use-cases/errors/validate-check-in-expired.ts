class ValidateCheckInExpired extends Error {
  constructor(
    public maxBeforeExpire: number = 20,
    public timeFormat: string = 'minutes',
  ) {
    super(
      `The check-in can only be validated until ${maxBeforeExpire} ${timeFormat} of its creation.`,
    )
  }
}

export { ValidateCheckInExpired }
