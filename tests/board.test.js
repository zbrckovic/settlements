import { Board } from '../src/game/board'
import { EdgeKey, TileType } from '../src/game/tile'
import { Coords } from '../src/game/misc'

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
    }).plain()

    const rotatedBoard = testBoard.withRotation().plain()

    expect(rotatedBoard).toEqual(expectedBoard)
  })

  test.each([
    [Coords.from({ x: 0, y: 0 }), EdgeKey.X, Coords.from({ x: 1, y: 0 })],
    [Coords.from({ x: 1, y: 0 }), EdgeKey.X, Coords.from({ x: 2, y: 0 })],
    [Coords.from({ x: 0, y: 0 }), EdgeKey.mX, Coords.from({ x: -1, y: 0 })],
    [Coords.from({ x: 0, y: 0 }), EdgeKey.XY, Coords.from({ x: 1, y: 1 })],
  ])('getNeighbourCoords(%s, %s) returns %s', (coords, edgeKey, expectedCoords) => {
    const actual = testBoard.getNeighbourTile(coords, edgeKey)
    const expected = testBoard.getTile(expectedCoords)
    expect(actual?.plain()).toEqual(expected?.plain())
  })
})
