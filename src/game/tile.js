import { Coords } from './misc'
import { Settlement } from './settlement'
import { Road } from './road'
import { equals } from '../utils'

export const TileType = {
  Pasture: 'Pasture',
  Forest: 'Forest',
  Fields: 'Fields',
  Hills: 'Hills',
  Mountains: 'Mountains',
  Desert: 'Desert'
}

export class Tile {
  /** @see constructor */
  static from (props) {
    return new Tile(props)
  }

  static fromPlain ({
    type,
    coords: coordsPlain,
    settlements: settlementsPlain = {},
    roads: roadsPlain = {}
  }) {
    const coords = Coords.from(coordsPlain)

    const settlements = {}
    Object.values(VertexKey).forEach(key => {
      if (settlementsPlain[key] !== undefined) {
        settlements[key] = Settlement.from(settlementsPlain[key])
      }
    })

    const roads = {}
    Object.values(EdgeKey).forEach(key => {
      if (roadsPlain[key] !== undefined) {
        roads[key] = Road.from(roadsPlain[key])
      }
    })

    return this.from({ type, coords, settlements, roads })
  }

  #type
  #coords
  #settlements
  #roads

  /** @private */
  constructor ({ type, coords, settlements = {}, roads = {} }) {
    this.#type = type
    this.#coords = coords
    this.#settlements = settlements
    this.#roads = roads
  }

  type () { return this.#type }

  coords () { return this.#coords }

  settlements () { return this.#settlements }

  roads () { return this.#roads }

  getRoad (edgeKey) {
    return this.#roads[edgeKey]
  }

  getSettlement (vertexKey) {
    return this.#settlements[vertexKey]
  }

  withCoords (coords) {
    return Tile.from({
      type: this.type(),
      coords,
      settlements: this.#settlements,
      roads: this.#roads
    })
  }

  withTranslation (coords) {
    return this.withCoords(this.coords().withAddition(coords))
  }

  withRotation () {
    return Tile.from({
      type: this.type(),
      coords: this.coords(),
      settlements: Tile.#repositionSettlementsForRotation(this.#settlements),
      roads: Tile.#repositionRoadsForRotation(this.#roads)
    })
  }

  abbreviation () {
    switch (this.type()) {
      case TileType.Pasture:
        return 'P'
      case TileType.Forest:
        return 'F'
      case TileType.Fields:
        return 'f'
      case TileType.Hills:
        return 'H'
      case TileType.Mountains:
        return 'M'
      case TileType.Desert:
        return 'D'
    }
  }

  compare (other) {
    return this.coords().compare(other.coords())
  }

  equals (other) {
    if (other === undefined) return false
    return equals(
      [this.#type, this.#coords, this.#settlements, this.#roads],
      [other.#type, other.#coords, other.#settlements, other.#roads]
    )
  }

  toString () {
    return `Tile(${this.#type}, ${this.#coords})`
  }

  id () {
    return this.coords().id()
  }

  static #repositionSettlementsForRotation (settlements) {
    const keys = Object.values(VertexKey)
    const shiftedKeys = [...keys.slice(1), keys[0]]

    const result = {}
    Object.values(keys).forEach((key, i) => {
      if (settlements[key] !== undefined) {
        result[shiftedKeys[i]] = settlements[key]
      }
    })
    return result
  }

  static #repositionRoadsForRotation (roads) {
    const keys = Object.values(EdgeKey)
    const shiftedKeys = [...keys.slice(1), keys[0]]
    const result = {}
    Object.values(keys).forEach((key, i) => {
      if (roads[key] !== undefined) {
        result[shiftedKeys[i]] = roads[key]
      }
    })
    return result
  }
}

export const VertexKey = {
  mY: 'mY', // -Y (up)
  mXmY: 'mXmY', // -X, -Y (left, up)
  mXY: 'mXY', // -X, +Y (left, down)
  Y: 'Y', // +Y (down)
  XY: 'XY', // +X, +Y (right, down)
  XmY: 'XmY', // +X, -Y (right, up)
}

export const EdgeKey = {
  X: 'X', // +X (right)
  XmY: 'XmY', // +X, -Y (right, up)
  mXmY: 'mXmY', // -X, -Y (left, up)
  mX: 'mX', // -X (left)
  mXY: 'mXY', // -X, +Y (left, down)
  XY: 'XY', // +X, +Y (right, down)
}

export const oppositeEdgeKeys = {
  [EdgeKey.X]: EdgeKey.mX,
  [EdgeKey.XmY]: EdgeKey.mXY,
  [EdgeKey.mXmY]: EdgeKey.XY,
  [EdgeKey.mX]: EdgeKey.X,
  [EdgeKey.mXY]: EdgeKey.XmY,
  [EdgeKey.XY]: EdgeKey.mXmY
}

export const oppositeVertexKeys = {
  [EdgeKey.X]: {
    [VertexKey.XmY]: VertexKey.mXmY,
    [VertexKey.XY]: VertexKey.mXY
  },
  [EdgeKey.XmY]: {
    [VertexKey.XmY]: VertexKey.Y,
    [VertexKey.mY]: VertexKey.mXY
  },

  [EdgeKey.mXmY]: {
    [VertexKey.mY]: VertexKey.XY,
    [VertexKey.XmY]: VertexKey.Y
  },
  [EdgeKey.mX]: {
    [VertexKey.mXmY]: VertexKey.XmY,
    [VertexKey.mXY]: VertexKey.XY
  },
  [EdgeKey.mXY]: {
    [VertexKey.mXY]: VertexKey.mY,
    [VertexKey.Y]: VertexKey.XmY
  },
  [EdgeKey.XY]: {
    [VertexKey.Y]: VertexKey.mXmY,
    [VertexKey.XY]: VertexKey.mY
  }
}

/**
 * Calculates coordinates of a tile which canonically owns the vertex, and a vertex key which
 * designates this same vertex from the tile's perspective.
 *
 * Each vertex is possibly shared by up to 3 tiles. We want a consistent way to refer to each
 * vertex on the board, so we always use the tile with the highest coordinates (even in the case of
 * edge vertices when the canonical owner tiles are not actually present on the board).
 */
export function calculateCanonicalVertexCoordsAndKey (coords, vertexKey) {
  switch (vertexKey) {
    case VertexKey.mY:
      return [coords, vertexKey]
    case VertexKey.mXmY:
      return [coords, vertexKey]
    case VertexKey.mXY:
      return [coords.withAddition(Coords.from({ x: 0, y: 1 })), VertexKey.mY]
    case VertexKey.Y:
      return [coords.withAddition(Coords.from({ x: 1, y: 1 })), VertexKey.mXmY]
    case VertexKey.XY:
      return [coords.withAddition(Coords.from({ x: 1, y: 1 })), VertexKey.mY]
    case VertexKey.XmY:
      return [coords.withAddition(Coords.from({ x: 1, y: 0 })), VertexKey.mXmY]
  }
}
