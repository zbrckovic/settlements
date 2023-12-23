import { TileType } from '../../game/tile'
import { Container, Graphics, Sprite } from 'pixi.js'
import { addPointsToGraphics } from '../../pixi-utils'
import { Point } from './geometry'
import { TileGeometry } from './tile-geometry'

export class TileView {
  /** @see constructor */
  static from (props) {
    return new TileView(props)
  }

  /**
   * Game model object.
   */
  #tile
  #assets
  #geometry
  /**
   * PixiJS display object containing the tile's graphics.
   */
  #container

  /** @private */
  constructor ({ tile, plane, assets }) {
    this.#tile = tile
    this.#assets = assets
    this.#geometry = TileGeometry.from({ plane })
    this.#container = new Container()

    this.container().addChild(this.#createHexGraphics())

    const sprite = new Sprite(this.#assets.hex)
    sprite.rotation = TileGeometry.HEX_ROTATION

    sprite.scale.set(0.15, 0.15)
    sprite.anchor.set(0.5, 0.5)

    const spriteContainer = new Container()
    spriteContainer.addChild(sprite)
    spriteContainer.skew.set(Math.PI / 2 - this.#geometry.plane().angleBetweenAxes(), 0)
    spriteContainer.rotation = this.#geometry.plane().tiltAngle()

    this.container().addChild(spriteContainer)
  }

  /**
   * The smallest frame which contains all hex points in tile's local space.
   */
  frame () {
    return this.#geometry.frame()
  }

  /**
   * Like frame(), but in parent's coordinate space.
   */
  frameInParentSpace () {
    return this.frame().withTranslation(Point.from(this.container().position))
  }

  container () { return this.#container }

  /**
   * Moves tile's container, so its center is at the specified position.
   */
  setPosition (position) {
    this.#container.position.set(position.x(), position.y())
  }

  /**
   * Creates a Graphics object which draws a tile for cases when we are not using sprites (for
   * example, when developing and debugging).
   */
  #createHexGraphics () {
    const color = this.#calculateTileColor()
    const graphics = new Graphics().beginFill(color)
    return addPointsToGraphics(graphics, this.#geometry.hexPoints())
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

