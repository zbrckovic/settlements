import { Point } from './point'

export class Frame {
  /**
   * Calculates the smallest frame which contains all the points.
   */
  static calculateContainingFrame (...points) {
    if (points.length === 0) throw new Error('points not provided')

    let minX = +Infinity
    let maxX = -Infinity
    let minY = +Infinity
    let maxY = -Infinity
    points.forEach(function (point) {
      minX = Math.min(minX, point.x())
      maxX = Math.max(maxX, point.x())
      minY = Math.min(minY, point.y())
      maxY = Math.max(maxY, point.y())
    })
    const point1 = Point.from({ x: minX, y: minY })
    const point2 = Point.from({ x: maxX, y: maxY })
    return Frame.from({ point1, point2 })
  }

  #point1
  #point2

  /** @see constructor */
  static from ({ point1, point2 }) {
    return new Frame({ point1, point2 })
  }

  /**
   * @private
   * A rectangle defined by two points.
   * @param {Object} point1 - The point with smallest x and y.
   * @param {Object} point2 - The point with largest x and y.
   */
  constructor ({ point1, point2 }) {
    this.#point1 = point1
    this.#point2 = point2
  }

  point1 () { return this.#point1 }

  point2 () { return this.#point2 }

  width () { return this.point2().x() - this.point1().x() }

  height () { return this.point2().y() - this.point1().y() }

  withPoint1 (point1) {
    return Frame.from({ point1, point2: this.point2() })
  }

  withPoint2 (point2) {
    return Frame.from({ point1: this.point1(), point2 })
  }

  withTranslation (point) {
    const point1 = this.point1().withAddition(point)
    const point2 = this.point2().withAddition(point)
    return Frame.from({ point1, point2 })
  }
}
