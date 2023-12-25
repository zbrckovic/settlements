import { Coords } from './misc'
import {
  calculateCanonicalVertexCoordsAndKey,
  EdgeKey,
  oppositeEdgeKeys,
  oppositeVertexKeys,
  Tile
} from './tile'
import { equals } from '../utils'
import { Settlements } from './settlements'
import { Roads } from './roads'

export class Board {
  static INCONSISTENT_ROADS_ERROR = 'INCONSISTENT_CODE_ERROR'
  static INCONSISTENT_SETTLEMENTS_ERROR = 'INCONSISTENT_SETTLEMENTS_ERROR'

  /** @see constructor */
  static from (props) {
    return new Board(props)
  }

  static fromPlain ({ tiles: tilesPlain }) {
    return this.from({ tiles: tilesPlain.map(t => Tile.fromPlain(t)) })
  }

  #tilesById
  #settlements = Settlements.from()
  #roads = Roads.from()

  /**
   * @private
   * @param props
   * @param {Tile[]} props.tiles
   */
  constructor ({ tiles }) {
    this.#initTilesById(tiles)
    this.#validateTiles()
  }

  /** Creates a map of tiles by their ids. */
  #initTilesById (tiles) {
    this.#tilesById = {}

    tiles.forEach(tile => {
      this.#tilesById[tile.id()] = tile
    })
  }

  #validateTiles () {
    const edgeKeys = Object.values(EdgeKey)

    const settlements = {}

    this.tiles().forEach(tile => {
      const coords = tile.coords()

      edgeKeys.forEach(edgeKey => {
        const neighbourTile = this.getNeighbourTile(coords, edgeKey)
        if (neighbourTile === undefined) return

        // process roads
        const oppositeEdgeKey = oppositeEdgeKeys[edgeKey]
        const tileRoad = tile.getRoad(edgeKey)
        const neighbourTileRoad = neighbourTile.getRoad(oppositeEdgeKey)
        if (!equals(tileRoad, neighbourTileRoad)) {
          throw new Error(Board.INCONSISTENT_ROADS_ERROR)
        }

        // process settlements
        const vertexKeys = oppositeVertexKeys[edgeKey]
        Object.entries(vertexKeys).forEach(([vertexKey, neighbourVertexKey]) => {
          const settlement = tile.getSettlement(vertexKey)
          const neighbourSettlement = neighbourTile.getSettlement(neighbourVertexKey)
          if (!equals(settlement, neighbourSettlement)) {
            throw new Error(Board.INCONSISTENT_SETTLEMENTS_ERROR)
          }

          if (settlement !== undefined) {
            this.#settlements.set(
              ...calculateCanonicalVertexCoordsAndKey(coords, vertexKey),
              settlement
            )
          }
        })
      })
    })
  }

  tiles () { return Object.values(this.#tilesById) }

  getTile (coords) {
    return this.#tilesById[coords.id()]
  }

  withRotation () {
    const repositionedTiles = Board.#repositionAndRotateTilesForRotation(this.tiles())
    return Board.#normalizeTiles(repositionedTiles)
  }

  getNeighbourTile (coords, edgeKey) {
    const neighbourCoords = this.getNeighbourCoords(coords, edgeKey)
    return this.#tilesById[neighbourCoords.id()]
  }

  getNeighbourCoords (coords, edgeKey) {
    switch (edgeKey) {
      case EdgeKey.X:
        return coords.withAddition(Coords.from({ x: 1, y: 0 }))
      case EdgeKey.XmY:
        return coords.withAddition(Coords.from({ x: 1, y: -1 }))
      case EdgeKey.mXmY:
        return coords.withAddition(Coords.from({ x: -1, y: -1 }))
      case EdgeKey.mX:
        return coords.withAddition(Coords.from({ x: -1, y: 0 }))
      case EdgeKey.mXY:
        return coords.withAddition(Coords.from({ x: -1, y: 1 }))
      case EdgeKey.XY:
        return coords.withAddition(Coords.from({ x: 1, y: 1 }))
    }
  }

  toString () {
    const { x, y, width, height } = Board.#calculateFrame(this.tiles())

    let result = ''
    for (let row = y; row < y + height; row++) {
      for (let col = x; col < x + width; col++) {
        const coords = Coords.from({ x: col, y: row })
        const tile = this.#tilesById[coords.id()]
        result += tile ? tile.abbreviation() : '_'
      }
      result += '\n'
    }
    return result
  }

  static #repositionAndRotateTilesForRotation (tiles) {
    return tiles.map(tile => {
      const x = tile.coords().x()
      const y = tile.coords().y()
      // noinspection JSSuspiciousNameCombination
      return tile.withCoords(Coords.from({ x: y, y: y - x })).withRotation()
    })
  }

  /**
   * Translates coordinates of all tiles so that the board is fully in the positive quadrant and
   * there are no continuous gaps between axes and the board.
   */
  static #normalizeTiles (tiles) {
    const { x, y } = Board.#calculateFrame(tiles)
    const newTiles = Board.#translateTiles(tiles, -x, -y)
    return Board.from({ tiles: newTiles })
  }

  /**
   * Calculates the smallest rectangle which contains all the tiles.
   */
  static #calculateFrame (tiles) {
    if (tiles.length === 0) {
      return { x: 0, y: 0, width: 0, height: 0 }
    }

    let minX = +Infinity
    let maxX = -Infinity
    let minY = +Infinity
    let maxY = -Infinity

    tiles.forEach(tile => {
      const coords = tile.coords()
      minX = Math.min(minX, coords.x())
      minY = Math.min(minY, coords.y())
      maxX = Math.max(maxX, coords.x())
      maxY = Math.max(maxY, coords.y())
    })

    const width = maxX - minX + 1
    const height = maxY - minY + 1

    return { x: minX, y: minY, width, height }
  }

  equals(other) {
    if (other === undefined) return undefined

    return equals(
      [this.#tilesById],
      [other.#tilesById],
    )

  }

  /**
   * Translates all tiles by given values.
   */
  static #translateTiles (tiles, x = 0, y = 0) {
    return tiles.map(tile => tile.withTranslation(Coords.from({ x, y })))
  }
}
