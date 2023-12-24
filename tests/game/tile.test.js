import { Tile, EdgeKey, TileType } from '../../src/game/tile'
import { Coords, EdgeDirection } from '../../src/game/misc'

describe('Tile', () => {
  test('withRotation()', () => {
    const rotatedTile = Tile
      .from({
        type: TileType.Forest,
        coords: Coords.from({ x: 0, y: 0 }),
        roads: {
          [EdgeKey.X]: Mock.from({ name: 'X' }),
          [EdgeKey.mXmY]: Mock.from({ name: 'mXmY' }),
          [EdgeKey.mXY]: Mock.from({ name: 'mXY' }),
        }
      })
      .withRotation()

    const expectedTile = Tile.from({
      type: TileType.Forest,
      coords: Coords.from({ x: 0, y: 0 }),
      roads: {
        [EdgeKey.XmY]: Mock.from({ name: 'X' }),
        [EdgeKey.mX]: Mock.from({ name: 'mXmY' }),
        [EdgeKey.XY]: Mock.from({ name: 'mXY' }),
      }
    })

    expect(rotatedTile.plain()).toEqual(expectedTile.plain())
  })

  class Mock {
    static from ({ name }) {
      return new Mock({ name })
    }

    constructor ({ name }) {
      this.name = name
    }

    plain () {
      return this.name
    }
  }
})
