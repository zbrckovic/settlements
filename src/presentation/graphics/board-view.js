import { Container, Graphics } from 'pixi.js'
import { createFrame, createPoint } from './geometry'
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
      const tileFrameLocal = tileView.frame()
      const tilePositionInBoard = createPoint({
        x: tileFrameLocal.position().x() + tileView.container().position.x,
        y: tileFrameLocal.position().y() + tileView.container().position.y
      })
      const tileFrameInBoard = createFrame({
        position: tilePositionInBoard,
        width: tileFrameLocal.width(),
        height: tileFrameLocal.height()
      })

      minX = Math.min(minX, tileFrameInBoard.position().x())
      maxX = Math.max(maxX, tileFrameInBoard.position().x() + tileFrameInBoard.width())
      minY = Math.min(minY, tileFrameInBoard.position().y())
      maxY = Math.max(maxY, tileFrameInBoard.position().y() + tileFrameInBoard.height())
    })
    const position = createPoint({ x: minX, y: minY })
    const width = maxX - minX
    const height = maxY - minY
    return createFrame({ position, width, height })
  })()

  container.position.set(-frame.position().x(), -frame.position().y())

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
    const tileVerticalOffset = createPoint({ x: -tileWidth / 2, y: 2 * tileSide - tileRoofHeight })
      .map(plane.project)

    // How much to move the tile to the right to position it the next column of the same row.
    const tileHorizontalOffset = createPoint({ x: tileWidth, y: 0 }).map(plane.project)

    const zeroTilePosition = createPoint({ x: 0, y: 0 })
    const coords = tile.coords()
    const rowIndex = coords.y()
    const colIndex = coords.x()

    const verticalOffset = tileVerticalOffset.multiply(rowIndex)
    const horizontalOffset = tileHorizontalOffset.multiply(colIndex)

    return zeroTilePosition.add(verticalOffset).add(horizontalOffset)
  }

  /**
   * For debugging.
   */
  function createAxesContainer () {
    const container = new Container()
    const thickness = 2
    const axisLength = 1000

    const xDestination = createPoint({ x: axisLength, y: 0 }).map(plane.project)
    const yDestination = createPoint({ x: 0, y: axisLength }).map(plane.project)

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


