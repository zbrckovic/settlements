import { Container, Graphics, Sprite } from 'pixi.js'
import { calculateRegularPolygonPoints, createPoint } from './geometry'
import { addPointsToGraphics } from './pixi-utils'
import { tileRoofHeight, tileSide, tileWidth } from './rendering-const'
import { TileType } from './game/tile'

export const createBoardRenderer = ({ plane, assets }) => {
  const hexRotation = Math.PI / 6

  function renderBoard (board) {
    const boardContainer = new Container()

    // How much to move downwards to position the tile in the next row.
    const tileVerticalOffset = createPoint({ x: -tileWidth / 2, y: 2 * tileSide - tileRoofHeight })
      .map(plane.project)

    // How much to move to the right to position the tile in the next column.
    const tileHorizontalOffset = createPoint({ x: tileWidth, y: 0 }).map(plane.project)

    const topLeftTilePosition = createPoint({ x: 0, y: 0 })
    board.tiles().forEach(function (tile) {
      const coords = tile.coords()
      const rowIndex = coords.y()
      const colIndex = coords.x()

      const verticalOffset = tileVerticalOffset.multiply(rowIndex)

      const horizontalOffset = tileHorizontalOffset.multiply(colIndex)
      const tilePosition = topLeftTilePosition.add(verticalOffset).add(horizontalOffset)
      const tileContainer = renderTile(tile)
      tileContainer.position.set(tilePosition.x(), tilePosition.y())
      boardContainer.addChild(tileContainer)
    })

    boardContainer.addChild(createAxes())

    return boardContainer
  }

  return { renderBoard }

  /**
   * For debugging
   */
  function createAxes () {
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

  function calculateTileColor (tile) {
    if (tile === undefined) return 0x000000

    switch (tile) {
      case TileType.Pasture:
        return 0x0000ff
      case TileType.Mountains:
        return 0x00ff00
      case TileType.Hills:
        return 0x00ffff
      case TileType.Forest:
        return 0xff0000
      case TileType.Fields:
        return 0xff00ff
      case TileType.Desert:
        return 0xffff00
    }
  }

  function renderTile (tile) {
    const container = new Container()

    const color = calculateTileColor(tile)

    const center = createPoint({ x: 0, y: 0 })

    const hexPoints = calculateRegularPolygonPoints(center, tileSide, 6, Math.PI / 6)

    container.addChild(addPointsToGraphics(new Graphics().beginFill(color), hexPoints.map(plane.project)))

    const sprite = new Sprite(assets.hex)
    sprite.rotation = hexRotation
    sprite.scale.set(0.15, 0.15)
    sprite.anchor.set(0.5, 0.5)

    const spriteContainer = new Container()

    spriteContainer.addChild(sprite)
    spriteContainer.skew.set(Math.PI / 2 - plane.angleBetweenAxes(), 0)
    spriteContainer.rotation = plane.tiltAngle()

    container.addChild(spriteContainer)

    return container
  }
}


