/**
 * Used to identify the position of a tile on the board.
 * @param {number} props.x Column index which in non-isometric view increases in the right
 * direction.
 * @param {number} props.y Row index which in non-isometric view increases in the down-left
 * direction.
 */
export const createCoords = (props) => {
  let { x, y } = props

  return {
    x () { return x },
    y () { return y },
    setX (val) { x = val },
    setY (val) { y = val },
    state () { return { x, y } }
  }
}
