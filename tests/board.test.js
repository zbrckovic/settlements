import { Board } from '../src/game/board'
import { TileType } from '../src/game/tile'

describe('board', () => {
  let testBoard

  beforeEach(() => {
    testBoard = Board.fromPlain({
      tiles: [
        { type: TileType.Mountains, coords: { x: 0, y: 0 } },
        { type: TileType.Pasture, coords: { x: 1, y: 0 } },
        { type: TileType.Forest, coords: { x: 2, y: 0 } },

        { type: TileType.Fields, coords: { x: 0, y: 1 } },
        { type: TileType.Hills, coords: { x: 1, y: 1 } },
        { type: TileType.Pasture, coords: { x: 2, y: 1 } },
        { type: TileType.Hills, coords: { x: 3, y: 1 } },

        { type: TileType.Fields, coords: { x: 0, y: 2 } },
        { type: TileType.Forest, coords: { x: 1, y: 2 } },
        { type: TileType.Desert, coords: { x: 2, y: 2 } },
        { type: TileType.Forest, coords: { x: 3, y: 2 } },
        { type: TileType.Mountains, coords: { x: 4, y: 2 } },

        { type: TileType.Forest, coords: { x: 1, y: 3 } },
        { type: TileType.Mountains, coords: { x: 2, y: 3 } },
        { type: TileType.Fields, coords: { x: 3, y: 3 } },
        { type: TileType.Pasture, coords: { x: 4, y: 3 } },

        { type: TileType.Hills, coords: { x: 2, y: 4 } },
        { type: TileType.Fields, coords: { x: 3, y: 4 } },
        { type: TileType.Pasture, coords: { x: 4, y: 4 } },
      ]
    })
  })

  test('rotate()', () => {
    const expectedBoard = Board.fromPlain({
      tiles: [
        { type: TileType.Forest, coords: { x: 0, y: 0 } },
        { type: TileType.Hills, coords: { x: 1, y: 0 } },
        { type: TileType.Mountains, coords: { x: 2, y: 0 } },

        { type: TileType.Pasture, coords: { x: 0, y: 1 } },
        { type: TileType.Pasture, coords: { x: 1, y: 1 } },
        { type: TileType.Forest, coords: { x: 2, y: 1 } },
        { type: TileType.Pasture, coords: { x: 3, y: 1 } },

        { type: TileType.Mountains, coords: { x: 0, y: 2 } },
        { type: TileType.Hills, coords: { x: 1, y: 2 } },
        { type: TileType.Desert, coords: { x: 2, y: 2 } },
        { type: TileType.Fields, coords: { x: 3, y: 2 } },
        { type: TileType.Pasture, coords: { x: 4, y: 2 } },

        { type: TileType.Fields, coords: { x: 1, y: 3 } },
        { type: TileType.Forest, coords: { x: 2, y: 3 } },
        { type: TileType.Mountains, coords: { x: 3, y: 3 } },
        { type: TileType.Fields, coords: { x: 4, y: 3 } },

        { type: TileType.Fields, coords: { x: 2, y: 4 } },
        { type: TileType.Forest, coords: { x: 3, y: 4 } },
        { type: TileType.Hills, coords: { x: 4, y: 4 } },
      ]
    })

    testBoard.rotate()

    const actual = testBoard.plain()
    const expected = expectedBoard.plain()

    expect(actual).toEqual(expected)
  })
})
