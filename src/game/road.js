export class Road {
  static from ({ playerToken }) {
    return new Road({ playerToken })
  }

  #playerToken

  /** @private */
  constructor ({ playerToken }) {
    this.#playerToken = playerToken
  }

  playerToken () {
    return this.#playerToken
  }

  plain () {
    return this.playerToken()
  }

  equals (other) {
    return this.playerToken() === other.playerToken()
  }
}
