import { calculateRegularPolygonPoints, Frame, Point } from './geometry'
import { tileSide } from './rendering-const'

export class TileGeometry {
  static #memo = new WeakMap()

  static create ({ plane }) {
    const memoized = this.#memo.get(plane)
    if (memoized !== undefined) return memoized
    const newInstance = new TileGeometry({ plane })
    this.#memo.set(plane, newInstance)
    return newInstance
  }

  // Every hexagon is rotated by 30deg so one of its vertices points downwards.
  static HEX_ROTATION = Math.PI / 6

  // The center of the hexagon is the origin of tile container's coordinate system.
  static HEX_CENTER = Point.create({ x: 0, y: 0 })

  #plane
  /**
   * Vertices of tile's hexagon in tile's local coordinate space. This is actually the same for
   * every tile.
   */
  #hexPoints
  #frame

  constructor ({ plane }) {
    this.#plane = plane
    this.#hexPoints = this.#calculateHexPoints()
    this.#frame = this.#calculateFrame()
  }

  plane () { return this.#plane }

  hexPoints () { return this.#hexPoints }

  frame () { return this.#frame }

  #calculateHexPoints () {
    return calculateRegularPolygonPoints(
      TileGeometry.HEX_CENTER,
      tileSide,
      6,
      TileGeometry.HEX_ROTATION
    ).map(p => this.#plane.project(p))
  }

  #calculateFrame () {
    let minX = +Infinity
    let maxX = -Infinity
    let minY = +Infinity
    let maxY = -Infinity

    this.#hexPoints.forEach(function (point) {
      minX = Math.min(minX, point.x())
      maxX = Math.max(maxX, point.x())
      minY = Math.min(minY, point.y())
      maxY = Math.max(maxY, point.y())
    })
    const point1 = Point.create({ x: minX, y: minY })
    const point2 = Point.create({ x: maxX, y: maxY })
    return Frame.create({ point1, point2 })
  }
}
