import { TileType } from '../../game/tile'
import { Container, Graphics, Sprite } from 'pixi.js'
import { addPointsToGraphics } from '../../pixi-utils'
import { calculateRegularPolygonPoints, createPoint } from './geometry'
import { tileSide } from './rendering-const'

const hexRotation = Math.PI / 6
const hexCenter = createPoint({ x: 0, y: 0 })

export function createTileViewFactory ({ plane, assets }) {
  const hexPoints = calculateRegularPolygonPoints(hexCenter, tileSide, 6, hexRotation)
    .map(plane.project)

  const tileEdges = (function () {
    let minX = +Infinity
    let minY = +Infinity
    hexPoints.forEach(function (point) {
      minX = Math.min(minX, point.x())
      minY = Math.min(minY, point.y())
    })
    return createPoint({ x: minX, y: minY })
  })()

  return {
    createTileView (tile) {
      const container = createContainer()

      return {
        edges () {
          return tileEdges.add(createPoint({ x: container.position.x, y: container.position.y }))
        },
        container () { return container },
        setPosition (position) {
          container.position.set(position.x(), position.y())
        }
      }

      function createContainer () {
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

        // container.addChild(spriteContainer)

        return container
      }

      function createHexGraphics (tile, points) {
        const color = calculateTileColor(tile)
        const graphics = new Graphics().beginFill(color)
        return addPointsToGraphics(graphics, points)
      }

      function calculateTileColor () {
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
    }
  }
}

