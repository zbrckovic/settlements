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
    if (this.x() > other.x()) return -1
    if (this.x() < other.x()) return 1
    if (this.y() > other.y()) return -1
    if (this.y() < other.y()) return 1
    return 0
  }

  toString () {
    return `${this.x()},${this.y()}`
  }

  plain () { return [this.x(), this.y()] }
}
