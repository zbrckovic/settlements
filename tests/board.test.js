import { createBoard } from '../src/game/board'
import { createCoords } from '../src/game/misc'
import { createTile, TileType } from '../src/game/tile'

describe('board', () => {
  let testBoard

  beforeEach(() => {
    testBoard = createBoard({
      tiles: [
        createTile({ type: TileType.Mountains, coords: createCoords({ x: 0, y: 0 }) }),
        createTile({ type: TileType.Pasture, coords: createCoords({ x: 1, y: 0 }) }),
        createTile({ type: TileType.Forest, coords: createCoords({ x: 2, y: 0 }) }),

        createTile({ type: TileType.Fields, coords: createCoords({ x: 0, y: 1 }) }),
        createTile({ type: TileType.Hills, coords: createCoords({ x: 1, y: 1 }) }),
        createTile({ type: TileType.Pasture, coords: createCoords({ x: 2, y: 1 }) }),
        createTile({ type: TileType.Hills, coords: createCoords({ x: 3, y: 1 }) }),

        createTile({ type: TileType.Fields, coords: createCoords({ x: 0, y: 2 }) }),
        createTile({ type: TileType.Forest, coords: createCoords({ x: 1, y: 2 }) }),
        createTile({ type: TileType.Desert, coords: createCoords({ x: 2, y: 2 }) }),
        createTile({ type: TileType.Forest, coords: createCoords({ x: 3, y: 2 }) }),
        createTile({ type: TileType.Mountains, coords: createCoords({ x: 4, y: 2 }) }),

        createTile({ type: TileType.Forest, coords: createCoords({ x: 1, y: 3 }) }),
        createTile({ type: TileType.Mountains, coords: createCoords({ x: 2, y: 3 }) }),
        createTile({ type: TileType.Fields, coords: createCoords({ x: 3, y: 3 }) }),
        createTile({ type: TileType.Pasture, coords: createCoords({ x: 4, y: 3 }) }),

        createTile({ type: TileType.Hills, coords: createCoords({ x: 2, y: 4 }) }),
        createTile({ type: TileType.Fields, coords: createCoords({ x: 3, y: 4 }) }),
        createTile({ type: TileType.Forest, coords: createCoords({ x: 4, y: 4 }) }),
      ]
    })
  })

  test('rotate()', () => {
    const expectedBoard = createBoard({
      tiles: [
        createTile({ type: TileType.Mountains, coords: createCoords({ x: 0, y: 2 }) }),
        createTile({ type: TileType.Pasture, coords: createCoords({ x: 0, y: 1 }) }),
        createTile({ type: TileType.Forest, coords: createCoords({ x: 0, y: 0 }) }),

        createTile({ type: TileType.Fields, coords: createCoords({ x: 1, y: 3 }) }),
        createTile({ type: TileType.Hills, coords: createCoords({ x: 1, y: 2 }) }),
        createTile({ type: TileType.Pasture, coords: createCoords({ x: 1, y: 1 }) }),
        createTile({ type: TileType.Hills, coords: createCoords({ x: 1, y: 0 }) }),

        createTile({ type: TileType.Fields, coords: createCoords({ x: 3, y: 0 }) }),
        createTile({ type: TileType.Forest, coords: createCoords({ x: 3, y: 1 }) }),
        createTile({ type: TileType.Desert, coords: createCoords({ x: 3, y: 2 }) }),
        createTile({ type: TileType.Forest, coords: createCoords({ x: 3, y: 3 }) }),
        createTile({ type: TileType.Mountains, coords: createCoords({ x: 3, y: 4 }) }),

        createTile({ type: TileType.Forest, coords: createCoords({ x: 4, y: 0 }) }),
        createTile({ type: TileType.Mountains, coords: createCoords({ x: 4, y: 1 }) }),
        createTile({ type: TileType.Fields, coords: createCoords({ x: 4, y: 2 }) }),
        createTile({ type: TileType.Pasture, coords: createCoords({ x: 4, y: 3 }) }),

        createTile({ type: TileType.Hills, coords: createCoords({ x: 5, y: 0 }) }),
        createTile({ type: TileType.Fields, coords: createCoords({ x: 5, y: 1 }) }),
        createTile({ type: TileType.Forest, coords: createCoords({ x: 5, y: 2 }) }),
      ]
    })
    testBoard.rotate()
    const actual = testBoard.state()
    const expected = expectedBoard.state()
    expect(actual).toEqual(expected)
  })
})
