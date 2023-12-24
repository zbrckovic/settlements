export class Settlement {
  static village ({ playerToken }) {
    return new Settlement({ type: SettlementType.VILLAGE, playerToken })
  }

  static city ({ playerToken }) {
    return new Settlement({ type: SettlementType.CITY, playerToken })
  }

  #type
  #playerToken

  /** @private */
  constructor ({ type, playerToken }) {
    this.#type = type
    this.#playerToken = playerToken
  }

  type () {
    return this.#type
  }

  playerToken () {
    return this.#playerToken
  }

  plain () {
    return {
      type: this.type(),
      playerToken: this.playerToken()
    }
  }

  equals(other) {
    return this.type() === other.type() && this.playerToken() === other.playerToken()
  }
}

export const SettlementType = {
  VILLAGE: 'VILLAGE',
  CITY: 'CITY'
}
