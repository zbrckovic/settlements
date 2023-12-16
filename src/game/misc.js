/**
 * Used to identify the position of a tile on the board.
 * @param {number} props.x Column index which in non-isometric view increases in the right
 * direction.
 * @param {number} props.y Row index which in non-isometric view increases in the down-left
 * direction.
 */
export function createCoords (props) {
  let {
    x: _x,
    y: _y
  } = props

  function x () { return _x }
  function y () { return _y }
  function setX (val) { _x = val }
  function setY (val) { _y = val }

  function state () { return [x(), y()] }

  return { x, y, setX, setY, state }
}
