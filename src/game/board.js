export const createBoard = function ({ tiles = [] }) {
  const rowsByY = new Map()
  tiles.forEach(tile => {
    const coords = tile.coords()
    const row = rowsByY.get(coords.y()) || new Map()
    row.set(coords.x(), tile)
    rowsByY.set(coords.y(), row)
  })

  return Object.assign(
    Object.create(methods),
    { _tiles: new Set(tiles), _rowsByY: rowsByY }
  )
}

const methods = {
  tiles () { return this._tiles },
  setTiles (tiles) { this._tiles = tiles },
  rotate () {
    this.tiles().forEach(tile => {
      // noinspection JSSuspiciousNameCombination
      tile.coords.x = tile.coords.y
      tile.coords.y = -tile.coords.x
    })
    this._normalize()
  },
  /**
   * Translates coordinates of all tiles so that the board is fully in the positive quadrant and
   * there are no continuous gaps between axes and the board.
   */
  _normalize () {
    const { x, y } = this._frame()
    this._translate(-x, -y)
  },
  /**
   * Calculates the smallest rectangle which contains all the tiles (used for normalization).
   */
  _frame () {
    if (this.tiles().size === 0) {
      return { x: 0, y: 0, width: 0, height: 0 }
    }

    let minX = +Infinity
    let maxX = -Infinity
    let minY = +Infinity
    let maxY = -Infinity

    this.tiles().forEach(function (tile) {
      const coords = tile.coords()
      minX = Math.min(minX, coords.x())
      minY = Math.min(minY, coords.y())
      maxX = Math.max(maxX, coords.x())
      maxY = Math.max(maxY, coords.y())
    })

    const width = maxX - minX + 1
    const height = maxY - minY + 1

    return { x: minX, y: minY, width, height }
  },
  /**
   * Translates all tiles by given values.
   */
  _translate (x = 0, y = 0) {
    this.tiles().forEach(tile => {
      tile.coords().setX(tile.coords().x() + x)
      tile.coords().setY(tile.coords().y() + y)
    })
  },
}
