import { EdgeKey, Tile, TileType } from '../../src/game/tile'
import { Coords } from '../../src/game/misc'
import { Road } from '../../src/game/road'
import { PlayerToken } from '../../src/game/player-token'

describe('Tile', () => {
  test('withRotation()', () => {
    const rotatedTile = Tile
      .from({
        type: TileType.Forest,
        coords: Coords.from({ x: 0, y: 0 }),
        roads: {
          [EdgeKey.X]: Road.from({ playerToken: PlayerToken.A }),
          [EdgeKey.mXmY]: Road.from({ playerToken: PlayerToken.B }),
          [EdgeKey.mXY]: Road.from({ playerToken: PlayerToken.C }),
        }
      })
      .withRotation()

    const expectedTile = Tile.from({
      type: TileType.Forest,
      coords: Coords.from({ x: 0, y: 0 }),
      roads: {
        [EdgeKey.XmY]: Road.from({ playerToken: PlayerToken.A }),
        [EdgeKey.mX]:  Road.from({ playerToken: PlayerToken.B }),
        [EdgeKey.XY]: Road.from({ playerToken: PlayerToken.C }),
      }
    })

    expect(rotatedTile.plain()).toEqual(expectedTile.plain())
  })
})
