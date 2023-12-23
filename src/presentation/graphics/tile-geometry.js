import { calculateRegularPolygonPoints, Frame, Point } from './geometry'
import { tileSide } from './rendering-const'
import { VertexDirection } from '../../game/misc'

/**
 * Represents the geometry of a tile regardless of the rendering system. It is a hexagon in the
 * tile's local coordinate space (zero is at the center of the hexagon).
 */
export class TileGeometry {
  static #memo = new WeakMap()

  /**
   * Every tile has the same geometry, so the result is memoized per plane.
   * @see constructor
   */
  static from ({ plane }) {
    const memoized = this.#memo.get(plane)
    if (memoized !== undefined) return memoized
    const newInstance = new TileGeometry({ plane })
    this.#memo.set(plane, newInstance)
    return newInstance
  }

  // Every hexagon is rotated by 30deg so one of its vertices points downwards.
  static HEX_ROTATION = Math.PI / 6

  // The center of the hexagon is the origin of the tile container's coordinate system.
  static HEX_CENTER = Point.from({ x: 0, y: 0 })

  #plane
  /**
   * Vertices of tile's hexagon in tile's local coordinate space. This is the same for every tile.
   */
  #hexPoints
  #frame

  /** @private */
  constructor ({ plane }) {
    this.#plane = plane
    this.#hexPoints = this.#calculateHexPoints()
    this.#frame = Frame.calculateContainingFrame(...this.#hexPoints)
  }

  plane () { return this.#plane }

  hexPoints () { return this.#hexPoints }

  frame () { return this.#frame }

  getHexPoint(direction) {
    const i = vertexDirectionToIndex[direction]
    return this.hexPoints()[i]
  }

  #calculateHexPoints () {
    return calculateRegularPolygonPoints(
      TileGeometry.HEX_CENTER,
      tileSide,
      6,
      TileGeometry.HEX_ROTATION
    ).map(p => this.#plane.project(p))
  }
}

const vertexDirectionToIndex = {
  [VertexDirection.UP]: 4,
  [VertexDirection.UP_RIGHT]: 5,
  [VertexDirection.DOWN_RIGHT]: 0,
  [VertexDirection.DOWN]: 1,
  [VertexDirection.DOWN_LEFT]: 2,
  [VertexDirection.UP_LEFT]: 3
}
