/**
 * @param {number} props.x
 * @param {number} props.y
 */
export function createPoint (props) {
  const { x: _x, y: _y } = props

  function x () { return _x }

  function y () { return _y }

  function withX (x) { return createPoint({ x, y: y() }) }

  function withY (y) { return createPoint({ x: x(), y }) }

  function add (other) {
    return createPoint({
      x: x() + other.x(),
      y: y() + other.y()
    })
  }

  function distanceTo (other) {
    const hDistance = other.x() - x()
    const vDistance = other.y() - y()
    return Math.sqrt(Math.pow(hDistance, 2) + Math.pow(vDistance, 2))
  }

  function rotate (pivot, angle) {
    const hDistance = x() - pivot.x()
    const vDistance = y() - pivot.y()
    const radius = Math.sqrt(Math.pow(hDistance, 2) + Math.pow(vDistance, 2))
    // Angle between the horizontal line and the line connecting the pivot and the point
    const slant = Math.atan2(vDistance, hDistance)

    const newX = pivot.x() + radius * Math.cos(slant + angle)
    const newY = pivot.y() + radius * Math.sin(slant + angle)

    return createPoint({ x: newX, y: newY })
  }

  function multiply (factor) {
    return createPoint({
      x: x() * factor,
      y: y() * factor
    })
  }

  function map (mapper) {
    return mapper(createPoint({
      x: x(),
      y: y()
    }))
  }

  function mapX (mapper) { return withX(mapper(x())) }

  function mapY (mapper) { return withY(mapper(y())) }

  return { x, y, withX, withY, distanceTo, rotate, map, mapX, mapY, add, multiply }
}
