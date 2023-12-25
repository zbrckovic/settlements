import {
  calculateCanonicalVertexCoordsAndKey,
  EdgeKey,
  Tile,
  TileType,
  VertexKey
} from '../../src/game/tile'
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
        [EdgeKey.mX]: Road.from({ playerToken: PlayerToken.B }),
        [EdgeKey.XY]: Road.from({ playerToken: PlayerToken.C }),
      }
    })

    expect(rotatedTile.plain()).toEqual(expectedTile.plain())
  })

  test.each([
    [
      Coords.from({ x: 0, y: 0 }), VertexKey.mXmY,
      Coords.from({ x: 0, y: 0 }), VertexKey.mXmY,
    ],
    [
      Coords.from({ x: 0, y: 0 }), VertexKey.mY,
      Coords.from({ x: 0, y: 0 }), VertexKey.mY,
    ],
    [
      Coords.from({ x: 0, y: 0 }), VertexKey.mXY,
      Coords.from({ x: 0, y: 1 }), VertexKey.mY,
    ],
    [
      Coords.from({ x: 0, y: 0 }), VertexKey.Y,
      Coords.from({ x: 1, y: 1 }), VertexKey.mXmY,
    ],
    [
      Coords.from({ x: 0, y: 0 }), VertexKey.XY,
      Coords.from({ x: 1, y: 1 }), VertexKey.mY,
    ],
    [
      Coords.from({ x: 0, y: 0 }), VertexKey.XmY,
      Coords.from({ x: 1, y: 0 }), VertexKey.mXmY,
    ],
  ])('calculateCanonicalVertexCoordsAndKey() with %s and %s yields %s and %s', (
    coords1, vertexKey1,
    expectedCoords, expectedVertexKey
  ) => {
    const [
      actualCoords,
      actualVertexKey
    ] = calculateCanonicalVertexCoordsAndKey(coords1, vertexKey1)

    expect(actualCoords.plain()).toEqual(expectedCoords.plain())
    expect(actualVertexKey).toEqual(expectedVertexKey)
  })
})
