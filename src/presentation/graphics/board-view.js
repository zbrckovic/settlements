import { Container, Graphics } from 'pixi.js'
import { Frame, Point } from './geometry'
import { tileRoofHeight, tileSide, tileWidth } from './rendering-const'
import { TileView } from './tile-view'

export class BoardView {
  static create (props) {
    return new BoardView(props)
  }

  /**
   * Game model object.
   */
  #board
  #plane
  #assets
  #tileViews
  /**
   * PixiJS display object containing the board's graphics.
   */
  #container

  constructor ({ plane, assets, board }) {
    this.#plane = plane
    this.#assets = assets
    this.#board = board
    this.#tileViews = this.#createTileViews()
    this.#container = new Container()

    this.#container.addChild(...this.#tileViews.map(tileView => tileView.container()))
    this.#container.addChild(this.#createAxesContainer())

    const frame = this.#calculateFrame()

    // Position the container so that the whole content fits inside the positive quadrant.
    this.#container.position.set(-frame.point1().x(), -frame.point1().y())
  }

 container () { return this.#container }

  /**
   * Calculates the smallest frame which contains all tile's frames in board's local space.
   */
  #calculateFrame() {
    const points = []
    this.#tileViews.forEach(function (tileView) {
      const frame = tileView.frameAbs()
      points.push(frame.point1(), frame.point2())
    })
    return Frame.calculateContainingFrame(...points)
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
   * Creates a graphics object which draws axes for debugging.
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
