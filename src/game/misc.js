/**
 * Used to identify the position of a tile on the board.
 */
export class Coords {
  static create (props) {
    return new Coords(props)
  }

  #x
  #y

  /**
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

  withX (x) { return Coords.create({ x, y: this.y() }) }

  withY (y) { return Coords.create({ x: this.x(), y }) }

  state () { return [this.x(), this.y()] }
}
