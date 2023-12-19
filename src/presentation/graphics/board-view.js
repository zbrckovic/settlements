import { Container, Graphics } from 'pixi.js'
import { Frame, Point } from './geometry'
import { tileRoofHeight, tileSide, tileWidth } from './rendering-const'
import { TileView } from './tile-view'

export class BoardView {
  static create (props) {
    return new BoardView(props)
  }

  #plane
  #assets
  #board
  #tileViewFactory
  #container

  constructor ({ plane, assets, board }) {
    this.#plane = plane
    this.#assets = assets
    this.#board = board

    this.#container = new Container()

    const tileViews = this.#createTileViews()

    this.#container.addChild(...tileViews.map(tileView => tileView.container()))
    this.#container.addChild(this.#createAxesContainer())

    const frame = (function () {
      let minX = +Infinity
      let maxX = -Infinity
      let minY = +Infinity
      let maxY = -Infinity
      tileViews.forEach(function (tileView) {
        const tileFrame = tileView.frameAbs()

        minX = Math.min(minX, tileFrame.point1().x())
        maxX = Math.max(maxX, tileFrame.point1().x() + tileFrame.width())
        minY = Math.min(minY, tileFrame.point1().y())
        maxY = Math.max(maxY, tileFrame.point1().y() + tileFrame.height())
      })
      const point1 = Point.create({ x: minX, y: minY })
      const point2 = Point.create({ x: maxX, y: maxY })
      return Frame.create({ point1, point2 })
    })()

    this.#container.position.set(-frame.point1().x(), -frame.point1().y())
  }

  container () { return this.#container }

  setPosition (position) {
    this.container().position.set(position.x(), position.y())
  }

  #createTileViews () {
    const result = []

    this.#board.tiles().forEach((tile) => {
      const tileView = TileView.create({ tile, plane: this.#plane, assets: this.#assets })
      const tilePosition = this.#calculateTilePosition(tile)
      tileView.setPosition(tilePosition)
      result.push(tileView)
    })

    return result
  }

  #calculateTilePosition (tile) {
    // How much to move the tile to position it in the next row of the same column.
    const tileVerticalOffset = Point.create({ x: -tileWidth / 2, y: 2 * tileSide - tileRoofHeight })
      .map(p => this.#plane.project(p))

    // How much to move the tile to the right to position it the next column of the same row.
    const tileHorizontalOffset = Point
      .create({ x: tileWidth, y: 0 })
      .map(p => this.#plane.project(p))

    const zeroTilePosition = Point.create({ x: 0, y: 0 })
    const coords = tile.coords()
    const rowIndex = coords.y()
    const colIndex = coords.x()

    const verticalOffset = tileVerticalOffset.withMultiplication(rowIndex)
    const horizontalOffset = tileHorizontalOffset.withMultiplication(colIndex)

    return zeroTilePosition.withAddition(verticalOffset).withAddition(horizontalOffset)
  }

  /**
   * For debugging.
   */
  #createAxesContainer () {
    const container = new Container()
    const thickness = 2
    const axisLength = 1000

    const xDestination = Point.create({ x: axisLength, y: 0 }).map(p => this.#plane.project(p))
    const yDestination = Point.create({ x: 0, y: axisLength }).map(p => this.#plane.project(p))

    this.container().addChild(new Graphics()
      .lineStyle(thickness, 0xff0000)
      .moveTo(0, 0)
      .lineTo(xDestination.x(), xDestination.y()), new Graphics()
      .lineStyle(thickness, 0x00ff00)
      .moveTo(0, 0)
      .lineTo(yDestination.x(), yDestination.y()))
    return container
  }
}
