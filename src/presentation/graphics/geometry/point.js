export class Point {
  static create ({ x, y }) {
    return new Point({ x, y })
  }

  constructor ({ x, y }) {
    this._x = x
    this._y = y
  }

  x () { return this._x }

  y () { return this._y }

  withX (x) { return Point.create({ x, y: this.y() }) }

  withY (y) { return Point.create({ x: this.x(), y }) }

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

    return Point.create({ x: newX, y: newY })
  }

  map (mapper) { return mapper(this) }

  withMappedX (mapper) { return Point.create({ x: mapper(this.x()), y: this.y() }) }

  withMappedY (mapper) { return Point.create({ x: this.x(), y: mapper(this.y()) }) }

  withAdded (other) { return Point.create({ x: this.x() + other.x(), y: this.y() + other.y() }) }

  withMultiplier (factor) { return Point.create({ x: this.x() * factor, y: this.y() * factor })}
}
