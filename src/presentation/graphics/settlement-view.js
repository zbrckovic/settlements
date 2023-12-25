import { Container, Graphics } from 'pixi.js'
import { calculateRegularPolygonPoints, Point } from './geometry'
import { tileSide } from './rendering-const'
import { addPointsToGraphics } from '../../pixi-utils'

export class SettlementView {
  /** @see constructor */
  static from (props) {
    return new SettlementView(props)
  }

  // The center of the settlement is the origin of the tile container's coordinate system.
  static CENTER = Point.from({ x: 0, y: 0 })

  #settlement
  #plane
  #assets
  #boundsPoints
  /**
   * PixiJS display object containing the settlement's graphics.
   */
  #container

  constructor ({ settlement, plane, assets }) {
    this.#settlement = settlement
    this.#plane = plane
    this.#assets = assets
    this.#initBoundsPoints()

    this.#container = new Container()
    this.#container.addChild(this.#createBoundsGraphics())
  }

  container () { return this.#container }

  #initBoundsPoints () {
    this.#boundsPoints = calculateRegularPolygonPoints(
      SettlementView.CENTER,
      tileSide,
      6
    ).map(p => this.#plane.project(p))
  }

  #createBoundsGraphics () {
    const graphics = new Graphics().beginFill(0x000000)
    addPointsToGraphics(graphics, this.#boundsPoints)
    return graphics
  }
}
