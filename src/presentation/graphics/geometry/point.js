export class Point {
  /** @see constructor */
  static from ({ x, y }) {
    return new Point({ x, y })
  }

  #x
  #y

  /** @private */
  constructor ({ x, y }) {
    this.#x = x
    this.#y = y
  }

  x () { return this.#x }

  y () { return this.#y }

  withX (x) { return Point.from({ x, y: this.y() }) }

  withY (y) { return Point.from({ x: this.x(), y }) }

  distanceTo (other) {
    const hDistance = other.x() - this.x()
    const vDistance = other.y() - this.y()
    return Math.sqrt(Math.pow(hDistance, 2) + Math.pow(vDistance, 2))
  }

  withRotation (pivot, angle) {
    const hDistance = this.x() - pivot.x()
    const vDistance = this.y() - pivot.y()
    const radius = Math.sqrt(Math.pow(hDistance, 2) + Math.pow(vDistance, 2))
    // Angle between the horizontal line and the line connecting the pivot and the point
    const slant = Math.atan2(vDistance, hDistance)

    const newX = pivot.x() + radius * Math.cos(slant + angle)
    const newY = pivot.y() + radius * Math.sin(slant + angle)

    return Point.from({ x: newX, y: newY })
  }

  map (mapper) { return mapper(this) }

  withMappedX (mapper) { return Point.from({ x: mapper(this.x()), y: this.y() }) }

  withMappedY (mapper) { return Point.from({ x: this.x(), y: mapper(this.y()) }) }

  withAddition (other) { return Point.from({ x: this.x() + other.x(), y: this.y() + other.y() }) }

  withMultiplication (factor) { return Point.from({ x: this.x() * factor, y: this.y() * factor })}

  compare (other) {
    if (this.x() > other.x()) return -1
    if (this.x() < other.x()) return 1
    if (this.y() > other.y()) return -1
    if (this.y() < other.y()) return 1
    return 0
  }
}
