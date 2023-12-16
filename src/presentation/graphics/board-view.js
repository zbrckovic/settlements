import { Container, Graphics } from 'pixi.js'
import { createPoint } from './geometry'
import { tileRoofHeight, tileSide, tileWidth } from './rendering-const'
import { createTileView } from './tile-view'

export const createBoardView = ({ plane, assets, board }) => {
  const _container = new Container()

  const tileViews = createTileViews()
  tileViews.forEach(function (tileView) {
    _container.addChild(tileView.container())
  })
  _container.addChild(createAxesContainer())

  function container () { return _container }

  function setPosition (position) {
    _container.position.set(position.x(), position.y())
  }

  return { container, setPosition }

  function createTileViews () {
    const result = []

    board.tiles().forEach(function (tile) {
      const tileView = createTileView({ plane, assets, tile })
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


