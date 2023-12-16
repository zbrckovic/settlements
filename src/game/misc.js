/**
 * Used to identify the position of a tile on the board.
 * @param {number} x Column index which in non-isometric view increases in the right
 * direction.
 * @param {number} y Row index which in non-isometric view increases in the down-left
 * direction.
 */
export function createCoords ({ x, y}) {
  const that = {
    x () { return x },
    y () { return y },
    setX (val) { x = val },
    setY (val) { y = val },
    state () { return [that.x(), that.y()] }
  }
  return that
}
