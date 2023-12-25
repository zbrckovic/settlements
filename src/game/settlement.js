import { equals } from '../utils'

export class Settlement {
  static village ({ playerToken }) {
    return new Settlement({ type: SettlementType.VILLAGE, playerToken })
  }

  static city ({ playerToken }) {
    return new Settlement({ type: SettlementType.CITY, playerToken })
  }

  static from({ type, playerToken }) {
    return new Settlement({ type, playerToken })
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

  equals(other) {
    if (other === undefined) return false;
    return equals([this.#type, this.#playerToken], [other.#type, other.#playerToken]);
  }

  toString() {
    return `Settlement(${this.#type}, ${this.#playerToken})`
  }
}

export const SettlementType = {
  VILLAGE: 'VILLAGE',
  CITY: 'CITY'
}

