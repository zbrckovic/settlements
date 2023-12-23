import { Coords } from './misc'
import { Tile } from './tile'

export class Board {
  /** @see constructor */
  static from (props) {
    return new Board(props)
  }

  static fromPlain ({ tiles: tilesPlain }) {
    return this.from({ tiles: tilesPlain.map(t => Tile.fromPlain(t)) })
  }

  #tiles

  /** @private */
  constructor ({ tiles }) {
    this.#tiles = new Set(tiles)
  }

  tiles () { return this.#tiles }

  rotate () {
    const newTiles = new Set()

    this.tiles().forEach(tile => {
      const x = tile.coords().x()
      const y = tile.coords().y()
      // noinspection JSSuspiciousNameCombination
      const newTile = tile.withCoords(Coords.from({ x: y, y: y - x }))
      newTiles.add(newTile)
    })
    this.#tiles = newTiles

    this.#normalize()
  }

  toString () {
    const lookupMap = this.#tileLookupMap()
    const { x, y, width, height } = this.#frame()

    let result = ''
    for (let row = y; row < y + height; row++) {
      for (let col = x; col < x + width; col++) {
        const coords = Coords.from({ x: col, y: row })
        const tile = lookupMap[coords.id()]
        result += tile ? tile.abbreviation() : '_'
      }
      result += '\n'
    }
    return result
  }

  /**
   * Plain object for equality comparison in tests.
   */
  plain () {
    const result = Array.from(this.tiles().values())
    result.sort((a, b) => a.compare(b))
    return result.map(t => t.plain())
  }

  /**
   * Translates coordinates of all tiles so that the board is fully in the positive quadrant and
   * there are no continuous gaps between axes and the board.
   */
  #normalize () {
    const { x, y } = this.#frame()
    this.#translate(-x, -y)
  }

  /**
   * Calculates the smallest rectangle which contains all the tiles.
   */
  #frame () {
    if (this.tiles().size === 0) {
      return { x: 0, y: 0, width: 0, height: 0 }
    }

    let minX = +Infinity
    let maxX = -Infinity
    let minY = +Infinity
    let maxY = -Infinity

    this.tiles().forEach(tile => {
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

  /**
   * Translates all tiles by given values.
   */
  #translate (x = 0, y = 0) {
    const newTiles = new Set()
    this.tiles().forEach(tile => {
      const newTile = tile.withCoords(Coords.from({
        x: tile.coords().x() + x,
        y: tile.coords().y() + y
      }))
      newTiles.add(newTile)
    })
    this.#tiles = newTiles
  }

  /**
   * Creates a map of tiles by their coordinates.
   */
  #tileLookupMap () {
    const map = {}

    this.tiles().forEach(tile => {
      map[tile.id()] = tile
    })

    return map
  }
}
