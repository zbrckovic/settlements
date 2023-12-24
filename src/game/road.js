export class Road {
  /** @see constructor */
  static from (props) {
    return new Road(props)
  }

  static fromPlain ({}) {
    return this.from({})
  }

  constructor ({}) {}
}
