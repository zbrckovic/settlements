import { Board } from '../src/game/board'
import { Coords } from '../src/game/misc'
import { Tile, TileType } from '../src/game/tile'

describe('board', () => {
  let testBoard

  beforeEach(() => {
    testBoard = Board.create({
      tiles: [
        Tile.create({ type: TileType.Mountains, coords: Coords.create({ x: 0, y: 0 }) }),
        Tile.create({ type: TileType.Pasture, coords: Coords.create({ x: 1, y: 0 }) }),
        Tile.create({ type: TileType.Forest, coords: Coords.create({ x: 2, y: 0 }) }),

        Tile.create({ type: TileType.Fields, coords: Coords.create({ x: 0, y: 1 }) }),
        Tile.create({ type: TileType.Hills, coords: Coords.create({ x: 1, y: 1 }) }),
        Tile.create({ type: TileType.Pasture, coords: Coords.create({ x: 2, y: 1 }) }),
        Tile.create({ type: TileType.Hills, coords: Coords.create({ x: 3, y: 1 }) }),

        Tile.create({ type: TileType.Fields, coords: Coords.create({ x: 0, y: 2 }) }),
        Tile.create({ type: TileType.Forest, coords: Coords.create({ x: 1, y: 2 }) }),
        Tile.create({ type: TileType.Desert, coords: Coords.create({ x: 2, y: 2 }) }),
        Tile.create({ type: TileType.Forest, coords: Coords.create({ x: 3, y: 2 }) }),
        Tile.create({ type: TileType.Mountains, coords: Coords.create({ x: 4, y: 2 }) }),

        Tile.create({ type: TileType.Forest, coords: Coords.create({ x: 1, y: 3 }) }),
        Tile.create({ type: TileType.Mountains, coords: Coords.create({ x: 2, y: 3 }) }),
        Tile.create({ type: TileType.Fields, coords: Coords.create({ x: 3, y: 3 }) }),
        Tile.create({ type: TileType.Pasture, coords: Coords.create({ x: 4, y: 3 }) }),

        Tile.create({ type: TileType.Hills, coords: Coords.create({ x: 2, y: 4 }) }),
        Tile.create({ type: TileType.Fields, coords: Coords.create({ x: 3, y: 4 }) }),
        Tile.create({ type: TileType.Pasture, coords: Coords.create({ x: 4, y: 4 }) }),
      ]
    })
  })

  test('rotate', () => {
    const expectedBoard = Board.create({
      tiles: [
        Tile.create({ type: TileType.Forest, coords: Coords.create({ x: 0, y: 0 }) }),
        Tile.create({ type: TileType.Hills, coords: Coords.create({ x: 1, y: 0 }) }),
        Tile.create({ type: TileType.Mountains, coords: Coords.create({ x: 2, y: 0 }) }),

        Tile.create({ type: TileType.Pasture, coords: Coords.create({ x: 0, y: 1 }) }),
        Tile.create({ type: TileType.Pasture, coords: Coords.create({ x: 1, y: 1 }) }),
        Tile.create({ type: TileType.Forest, coords: Coords.create({ x: 2, y: 1 }) }),
        Tile.create({ type: TileType.Pasture, coords: Coords.create({ x: 3, y: 1 }) }),

        Tile.create({ type: TileType.Mountains, coords: Coords.create({ x: 0, y: 2 }) }),
        Tile.create({ type: TileType.Hills, coords: Coords.create({ x: 1, y: 2 }) }),
        Tile.create({ type: TileType.Desert, coords: Coords.create({ x: 2, y: 2 }) }),
        Tile.create({ type: TileType.Fields, coords: Coords.create({ x: 3, y: 2 }) }),
        Tile.create({ type: TileType.Pasture, coords: Coords.create({ x: 4, y: 2 }) }),

        Tile.create({ type: TileType.Fields, coords: Coords.create({ x: 1, y: 3 }) }),
        Tile.create({ type: TileType.Forest, coords: Coords.create({ x: 2, y: 3 }) }),
        Tile.create({ type: TileType.Mountains, coords: Coords.create({ x: 3, y: 3 }) }),
        Tile.create({ type: TileType.Fields, coords: Coords.create({ x: 4, y: 3 }) }),

        Tile.create({ type: TileType.Fields, coords: Coords.create({ x: 2, y: 4 }) }),
        Tile.create({ type: TileType.Forest, coords: Coords.create({ x: 3, y: 4 }) }),
        Tile.create({ type: TileType.Hills, coords: Coords.create({ x: 4, y: 4 }) }),
      ]
    })

    testBoard.rotate()

    const actual = testBoard.state()
    const expected = expectedBoard.state()

    expect(actual).toEqual(expected)
  })
})
