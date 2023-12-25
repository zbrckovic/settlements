import { Board } from '../src/game/board'
import { EdgeKey, Tile, TileType, VertexKey } from '../src/game/tile'
import { Coords } from '../src/game/misc'
import { PlayerToken } from '../src/game/player-token'
import { Road } from '../src/game/road'
import { Settlement } from '../src/game/settlement'
import { equals } from '../src/utils'

describe('Board', () => {
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

  test('withRotation()', () => {
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

    const rotatedBoard = testBoard.withRotation()

    expect(equals(rotatedBoard, expectedBoard)).toBe(true)
  })

  test.each([
    [Coords.from({ x: 0, y: 0 }), EdgeKey.X, Coords.from({ x: 1, y: 0 })],
    [Coords.from({ x: 1, y: 0 }), EdgeKey.X, Coords.from({ x: 2, y: 0 })],
    [Coords.from({ x: 0, y: 0 }), EdgeKey.mX, Coords.from({ x: -1, y: 0 })],
    [Coords.from({ x: 0, y: 0 }), EdgeKey.XY, Coords.from({ x: 1, y: 1 })],
  ])('getNeighbourTile(%s, %s) returns tile at %s', (coords, edgeKey, expectedCoords) => {
    const actual = testBoard.getNeighbourTile(coords, edgeKey)
    const expected = testBoard.getTile(expectedCoords)
    expect(equals(actual, expected)).toBe(true)
  })

  describe('constructor', () => {
    test('throws for road inconsistency', () => {
      const tile1 = Tile.from({
        coords: Coords.from({ x: 0, y: 0 }),
        roads: { [EdgeKey.X]: Road.from({ playerToken: PlayerToken.A }) }
      })
      const tile2 = Tile.from({
        coords: Coords.from({ x: 1, y: 0 }),
        roads: { [EdgeKey.mX]: Road.from({ playerToken: PlayerToken.B }) }
      })

      expect(() => {
        Board.from({ tiles: [tile1, tile2] })
      }).toThrow(Board.INCONSISTENT_ROADS_ERROR)
    })

    test('throws for settlement inconsistency', () => {
      const tile1 = Tile.from({
        coords: Coords.from({ x: 0, y: 0 }),
        settlements: { [VertexKey.XY]: Settlement.village({ playerToken: PlayerToken.A }) }
      })
      const tile2 = Tile.from({
        coords: Coords.from({ x: 1, y: 0 }),
        settlements: { [VertexKey.mXY]: Settlement.village({ playerToken: PlayerToken.B }) }
      })

      expect(() => {
        Board.from({ tiles: [tile1, tile2] })
      }).toThrow(Board.INCONSISTENT_SETTLEMENTS_ERROR)
    })
  })
})
