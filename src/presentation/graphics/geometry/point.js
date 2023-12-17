/**
 * @param {number} x
 * @param {number} y
 * @note Immutable.
 */
export function createPoint ({ x, y }) {
  const that = {
    x () { return x },
    y () { return y },
    withX (x) { return createPoint({ x, y: that.y() }) },
    withY (y) { return createPoint({ x: that.x(), y }) },
    distanceTo (other) {
      const hDistance = other.x() - that.x()
      const vDistance = other.y() - that.y()
      return Math.sqrt(Math.pow(hDistance, 2) + Math.pow(vDistance, 2))
    },
    withRotation (pivot, angle) {
      const hDistance = that.x() - pivot.x()
      const vDistance = that.y() - pivot.y()
      const radius = Math.sqrt(Math.pow(hDistance, 2) + Math.pow(vDistance, 2))
      // Angle between the horizontal line and the line connecting the pivot and the point
      const slant = Math.atan2(vDistance, hDistance)

      const newX = pivot.x() + radius * Math.cos(slant + angle)
      const newY = pivot.y() + radius * Math.sin(slant + angle)

      return createPoint({ x: newX, y: newY })
    },
    map (mapper) { return mapper(that) },
    withMappedX (mapper) { return createPoint({ x: mapper(that.x()), y: that.y() }) },
    withMappedY (mapper) { return createPoint({ x: that.x(), y: mapper(that.y()) }) },
    withAdded (other) { return createPoint({ x: that.x() + other.x(), y: that.y() + other.y() }) },
    withMultiplier (factor) { return createPoint({ x: that.x() * factor, y: that.y() * factor })}
  }
  return that
}
