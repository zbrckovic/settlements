import { Tile, RoadKey, TileType } from '../../src/game/tile'
import { Coords, EdgeDirection } from '../../src/game/misc'

describe('Tile', () => {
  test('withRotation()', () => {
    const rotatedTile = Tile
      .from({
        type: TileType.Forest,
        coords: Coords.from({ x: 0, y: 0 }),
        roads: {
          [RoadKey.X]: Mock.from({ name: 'X' }),
          [RoadKey.mXmY]: Mock.from({ name: 'mXmY' }),
          [RoadKey.mXY]: Mock.from({ name: 'mXY' }),
        }
      })
      .withRotation()

    const expectedTile = Tile.from({
      type: TileType.Forest,
      coords: Coords.from({ x: 0, y: 0 }),
      roads: {
        [RoadKey.XmY]: Mock.from({ name: 'X' }),
        [RoadKey.mX]: Mock.from({ name: 'mXmY' }),
        [RoadKey.XY]: Mock.from({ name: 'mXY' }),
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
