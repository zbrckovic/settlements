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

  #tilesById

  /**
   * @private
   * @param props
   * @param props.tiles - The list of tiles.
   */
  constructor ({ tiles }) {
    this.#initTiles(tiles)
  }

  tiles () { return Object.values(this.#tilesById) }

  withRotation () {
    const newTiles = this.tiles().map(tile => {
      const x = tile.coords().x()
      const y = tile.coords().y()
      // noinspection JSSuspiciousNameCombination
      return tile.withCoords(Coords.from({ x: y, y: y - x }))
    })

    return Board.#normalize(newTiles)
  }

  toString () {
    const { x, y, width, height } = Board.#frame(this.tiles())

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

  /**
   * Plain object for equality comparison in tests.
   */
  plain () {
    const result = Array.from(this.tiles())
    result.sort((a, b) => a.compare(b))
    return result.map(t => t.plain())
  }

  /**
   * Translates coordinates of all tiles so that the board is fully in the positive quadrant and
   * there are no continuous gaps between axes and the board.
   */
  static #normalize (tiles) {
    const { x, y } = Board.#frame(tiles)
    const newTiles = Board.#translate(tiles, -x, -y)
    return Board.from({ tiles: newTiles })
  }

  /**
   * Calculates the smallest rectangle which contains all the tiles.
   */
  static #frame (tiles) {
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

  /**
   * Translates all tiles by given values.
   */
  static #translate (tiles, x = 0, y = 0) {
    return tiles.map(tile => {
      return tile.withCoords(Coords.from({
        x: tile.coords().x() + x,
        y: tile.coords().y() + y
      }))
    })
  }

  /**
   * Creates a map of tiles by their coordinates.
   */
  #initTiles (tiles) {
    this.#tilesById = {}

    tiles.forEach(tile => {
      this.#tilesById[tile.id()] = tile
    })
  }
}
