import { Coords } from './misc'

export class Board {
  static create (props) {
    return new Board(props)
  }

  #tiles

  constructor ({ tiles }) {
    this.#tiles = tiles
  }

  tiles () { return this.#tiles }

  rotate () {
    this.tiles().forEach(tile => {
      const x = tile.coords().x()
      const y = tile.coords().y()
      // noinspection JSSuspiciousNameCombination
      tile.setCoords(Coords.create({ x: y, y: y - x }))
    })
    this.#normalize()
  }

  toString () {
    const lookupMap = this.#tileLookupMap()
    const { x, y, width, height } = this.#frame()

    let result = ''
    for (let row = y; row < y + height; row++) {
      for (let col = x; col < x + width; col++) {
        const tile = lookupMap.get(row)?.get(col)
        result += tile ? tile.abbreviation() : '_'
      }
      result += '\n'
    }
    return result
  }

  /**
   * POJO for equality comparison in tests.
   */
  state () {
    const state = new Set()
    this.tiles().forEach(tile => state.add(tile.state()))
    return state
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
    this.tiles().forEach(tile => {
      tile.setCoords(Coords.create({
        x: tile.coords().x() + x,
        y: tile.coords().y() + y
      }))
    })
  }

  /**
   * Creates a map of tiles by their coordinates.
   */
  #tileLookupMap () {
    const map = new Map()

    this.tiles().forEach(tile => {
      const coords = tile.coords()
      const row = map.get(coords.y()) ?? new Map()
      row.set(coords.x(), tile)
      map.set(coords.y(), row)
    })

    return map
  }
}
