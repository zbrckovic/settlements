export class Settlement {
  /** @see constructor */
  static from (props) {
    return new Settlement(props)
  }

  static fromPlain ({}) {
    return this.from({})
  }

  constructor ({}) {}
}
