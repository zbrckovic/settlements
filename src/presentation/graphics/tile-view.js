import { TileType } from '../../game/tile'
import { Container, Graphics, Sprite } from 'pixi.js'
import { addPointsToGraphics } from '../../pixi-utils'
import { calculateRegularPolygonPoints, Frame, Point } from './geometry'
import { tileSide } from './rendering-const'

const hexRotation = Math.PI / 6
const hexCenter = Point.create({ x: 0, y: 0 })

export function createTileViewFactory ({ plane, assets }) {
  const hexPoints = calculateRegularPolygonPoints(hexCenter, tileSide, 6, hexRotation)
    .map(p => plane.project(p))

  return {
    createTileView (tile) {
      return new TileView({ plane, tile, hexPoints, assets })
    }
  }
}

class TileView {
  #plane
  #tile
  #hexPoints
  #assets
  #container

  constructor ({ plane, tile, hexPoints, assets }) {
    this.#plane = plane
    this.#tile = tile
    this.#hexPoints = hexPoints
    this.#assets = assets
    this.#container = new Container()

    this.container().addChild(this.#createHexGraphics())

    const sprite = new Sprite(this.#assets.hex)
    sprite.rotation = hexRotation
    sprite.scale.set(0.15, 0.15)
    sprite.anchor.set(0.5, 0.5)

    const spriteContainer = new Container()
    spriteContainer.addChild(sprite)
    spriteContainer.skew.set(Math.PI / 2 - this.#plane.angleBetweenAxes(), 0)
    spriteContainer.rotation = this.#plane.tiltAngle()

    // container.addChild(spriteContainer)
  }

  frame () {
    let minX = +Infinity
    let maxX = -Infinity
    let minY = +Infinity
    let maxY = -Infinity
    this.#hexPoints.forEach(function (point) {
      minX = Math.min(minX, point.x())
      maxX = Math.max(maxX, point.x())
      minY = Math.min(minY, point.y())
      maxY = Math.max(maxY, point.y())
    })
    const point1 = Point.create({ x: minX, y: minY })
    const point2 = Point.create({ x: maxX, y: maxY })
    return Frame.create({ point1, point2 })
  }

  frameAbs () {
    const position = Point.create(this.container().position)
    return this.frame().withPoint1(this.frame().point1().withAddition(position))
  }

  container () { return this.#container }

  setPosition (position) {
    this.#container.position.set(position.x(), position.y())
  }

  #createHexGraphics () {
    const color = this.#calculateTileColor()
    const graphics = new Graphics().beginFill(color)
    return addPointsToGraphics(graphics, this.#hexPoints)
  }

  #calculateTileColor () {
    if (this.#tile === undefined) return 0x000000

    switch (this.#tile.type()) {
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
