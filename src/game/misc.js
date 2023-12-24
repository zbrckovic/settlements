import { compareListsOfNumbers } from '../utils'

/**
 * Used to identify the position of a tile on the board.
 */
export class Coords {
  /** @see constructor */
  static from (props) {
    return new Coords(props)
  }

  #x
  #y

  /**
   * @private
   *
   * @param {number} x Column index which in non-isometric view increases in the right
   * direction.
   * @param {number} y Row index which in non-isometric view increases in the down-left
   * direction.
   */
  constructor ({ x, y }) {
    this.#x = x
    this.#y = y
  }

  x () { return this.#x }

  y () { return this.#y }

  compare (other) {
    return compareListsOfNumbers(this.plain(), other.plain())
  }

  plain () { return [this.x(), this.y()] }

  withAddition (other) {
    return Coords.from({
      x: this.x() + other.x(),
      y: this.y() + other.y()
    })
  }

  toString () {
    return `${this.x()},${this.y()}`
  }

  id () {
    return this.toString()
  }
}

export const VertexDirection = {
  UP: 'UP',
  UP_RIGHT: 'UP_RIGHT',
  DOWN_RIGHT: 'DOWN_RIGHT',
  DOWN: 'DOWN',
  DOWN_LEFT: 'DOWN_LEFT',
  UP_LEFT: 'UP_LEFT',
}

export const EdgeDirection = {
  UP_RIGHT: 'UP_RIGHT',
  DOWN_RIGHT: 'DOWN_RIGHT',
  RIGHT: 'RIGHT',
  DOWN_LEFT: 'DOWN_LEFT',
  LEFT: 'LEFT',
  UP_LEFT: 'UP_LEFT',
}
