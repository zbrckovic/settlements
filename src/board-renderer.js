import { Container, Graphics, Sprite } from 'pixi.js'
import { calculateRegularPolygonPoints, createPoint } from './geometry'
import { addPointsToGraphics } from './pixi-utils'
import { tileRoofHeight, tileSide, tileWidth } from './rendering-const'
import { TileType } from './game/tile'

export const createBoardRenderer = ({ plane, assets }) => {
  const hexRotation = Math.PI / 6

  const hexPoints = calculateRegularPolygonPoints(
    createPoint({ x: 0, y: 0 }), tileSide, 6, Math.PI / 6
  )
    .map(plane.project)

  function renderBoard (board) {
    const boardContainer = new Container()

    // How much to move the tile to position it in the next row of the same column.
    const tileVerticalOffset = createPoint({ x: -tileWidth / 2, y: 2 * tileSide - tileRoofHeight })
      .map(plane.project)

    // How much to move the tile to the right to position it the next column of the same row.
    const tileHorizontalOffset = createPoint({ x: tileWidth, y: 0 }).map(plane.project)

    const zeroTilePosition = createPoint({ x: 0, y: 0 })
    board.tiles().forEach(function (tile) {
      const coords = tile.coords()
      const rowIndex = coords.y()
      const colIndex = coords.x()

      const verticalOffset = tileVerticalOffset.multiply(rowIndex)
      const horizontalOffset = tileHorizontalOffset.multiply(colIndex)

      const tilePosition = zeroTilePosition
        .add(verticalOffset)
        .add(horizontalOffset)

      const tileContainer = renderTile(tile)

      tileContainer.position.set(tilePosition.x(), tilePosition.y())

      boardContainer.addChild(tileContainer)
    })

    boardContainer.addChild(renderAxes())

    return boardContainer
  }

  return { renderBoard }

  function calculateTileColor (tile) {
    if (tile === undefined) return 0x000000

    switch (tile.type()) {
      case TileType.Pasture:
        return 0xd1f0a8
      case TileType.Mountains:
        return 0xbababa
      case TileType.Hills:
        return 0xc97465
      case TileType.Forest:
        return 0x587844
      case TileType.Fields:
        return 0xffbd14
      case TileType.Desert:
        return 0xffeac7
    }
  }

  function renderTile (tile) {
    const container = new Container()

    container.addChild(createHexGraphics(tile, hexPoints))

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

  /**
   * For debugging.
   */
  function createHexGraphics (tile, points) {
    const color = calculateTileColor(tile)
    const graphics = new Graphics().beginFill(color)
    return addPointsToGraphics(graphics, points)
  }

  /**
   * For debugging.
   */
  function renderAxes () {
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


