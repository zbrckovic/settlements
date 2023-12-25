import { equals } from '../utils'

export class Road {
  static from ({ playerToken }) {
    return new Road({ playerToken })
  }

  #playerToken

  /** @private */
  constructor ({ playerToken }) {
    this.#playerToken = playerToken
  }

  equals (other) {
    if (other === undefined) return false
    return equals([this.#playerToken], [other.#playerToken])
  }

  toString () {
    return `Road(${this.#playerToken})`
  }
}
