import { Container, Graphics } from 'pixi.js'
import { Frame, Point } from './geometry'
import { tileRoofHeight, tileSide, tileWidth } from './rendering-const'
import { createTileViewFactory } from './tile-view'

export const createBoardView = ({ plane, assets, board }) => {
  const container = new Container()

  const tileViewFactory = createTileViewFactory({ plane, assets })
  const tileViews = createTileViews()

  container.addChild(...tileViews.map(tileView => tileView.container()))
  container.addChild(createAxesContainer())

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

  container.position.set(-frame.point1().x(), -frame.point1().y())

  const that = {
    container () { return container },
    setPosition (position) {
      that.container().position.set(position.x(), position.y())
    }
  }

  return that

  function createTileViews () {
    const result = []

    board.tiles().forEach(function (tile) {
      const tileView = tileViewFactory.createTileView(tile)
      const tilePosition = calculateTilePosition(tile)
      tileView.setPosition(tilePosition)
      result.push(tileView)
    })

    return result
  }

  function calculateTilePosition (tile) {
    // How much to move the tile to position it in the next row of the same column.
    const tileVerticalOffset = Point.create({ x: -tileWidth / 2, y: 2 * tileSide - tileRoofHeight })
      .map(plane.project)

    // How much to move the tile to the right to position it the next column of the same row.
    const tileHorizontalOffset = Point.create({ x: tileWidth, y: 0 }).map(plane.project)

    const zeroTilePosition = Point.create({ x: 0, y: 0 })
    const coords = tile.coords()
    const rowIndex = coords.y()
    const colIndex = coords.x()

    const verticalOffset = tileVerticalOffset.withMultiplier(rowIndex)
    const horizontalOffset = tileHorizontalOffset.withMultiplier(colIndex)

    return zeroTilePosition.withAdded(verticalOffset).withAdded(horizontalOffset)
  }

  /**
   * For debugging.
   */
  function createAxesContainer () {
    const container = new Container()
    const thickness = 2
    const axisLength = 1000

    const xDestination = Point.create({ x: axisLength, y: 0 }).map(plane.project)
    const yDestination = Point.create({ x: 0, y: axisLength }).map(plane.project)

    container.addChild(new Graphics()
      .lineStyle(thickness, 0xff0000)
      .moveTo(0, 0)
      .lineTo(xDestination.x(), xDestination.y()), new Graphics()
      .lineStyle(thickness, 0x00ff00)
      .moveTo(0, 0)
      .lineTo(yDestination.x(), yDestination.y()))
    return container
  }
}


