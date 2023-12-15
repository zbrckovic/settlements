/**
 * Used to identify the position of a tile on the board.
 * @param {number} x Column index which in non-isometric view increases in the right direction.
 * @param {number} y Row index which in non-isometric view increases in the down-left direction.
 */
export const createCoords = ({ x, y }) => {
  return Object.assign(Object.create(methods), { _x: x, _y: y })
}

const methods = {
  x () { return this._x },
  y () { return this._y },
  setX (x) { this._x = x },
  setY (y) { this._y = y }
}
