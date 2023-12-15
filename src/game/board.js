// noinspection JSSuspiciousNameCombination

export function createBoard ({ tiles: tilesArray }) {
  const tiles = new Set(tilesArray)

  return {
    tiles () { return tiles },
    rotate () {
      tiles.forEach(tile => {
        const x = tile.coords().x()
        const y = tile.coords().y()
        tile.coords().setX(y)
        tile.coords().setY(y - x)
      })
      normalize()
    },
    toString() {
      const lookupMap = tileLookupMap()
      const { x, y, width, height } = frame()

      let result = ''
      for (let row = y; row < y + height; row++) {
        for (let col = x; col < x + width; col++) {
          const tile = lookupMap.get(row)?.get(col)
          result += tile ? tile.abbreviation() : '_'
        }
        result += '\n'
      }
      return result
    },
    state () {
      const state = new Set()
      tiles.forEach(tile => state.add(tile.state()))
      return state
    }
  }

  /**
   * Translates coordinates of all tiles so that the board is fully in the positive quadrant and
   * there are no continuous gaps between axes and the board.
   */
  function normalize () {
    const { x, y } = frame()
    translate(-x, -y)
  }

  /**
   * Calculates the smallest rectangle which contains all the tiles (used for normalization).
   */
  function frame () {
    if (tiles.size === 0) {
      return { x: 0, y: 0, width: 0, height: 0 }
    }

    let minX = +Infinity
    let maxX = -Infinity
    let minY = +Infinity
    let maxY = -Infinity

    tiles.forEach(function (tile) {
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
  function translate (x = 0, y = 0) {
    tiles.forEach(function (tile) {
      tile.coords().setX(tile.coords().x() + x)
      tile.coords().setY(tile.coords().y() + y)
    })
  }

  /**
   * Creates a map of tiles by their coordinates.
   */
  function tileLookupMap () {
    const map = new Map()

    tiles.forEach(tile => {
      const coords = tile.coords()
      const row = map.get(coords.y()) ?? new Map()
      row.set(coords.x(), tile)
      map.set(coords.y(), row)
    })

    return map
  }
}
