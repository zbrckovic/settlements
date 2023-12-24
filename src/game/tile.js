import { Coords } from './misc'
import { Settlement } from './settlement'
import { Road } from './road'

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
    Object.values(SettlementKey).forEach(key => {
      settlements[key] = settlementsPlain[key]
        ? Settlement.fromPlain(settlementsPlain[key])
        : undefined
    })

    const roads = {}
    Object.values(RoadKey).forEach(key => {
      roads[key] = roadsPlain[key]
        ? Road.fromPlain(roadsPlain[key])
        : undefined
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

  withCoords (coords) {
    return Tile.from({
      type: this.type(),
      coords,
      settlements: this.#settlements,
      roads: this.#roads
    })
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

  plain () {
    return {
      type: this.type(),
      coords: this.coords().plain(),
      settlements: Object.fromEntries(
        Object
          .entries(this.#settlements)
          .map(([key, settlement]) => [key, settlement?.plain()])
      ),
      roads: Object.fromEntries(
        Object
          .entries(this.#roads)
          .map(([key, road]) => [key, road?.plain()])
      )
    }
  }

  id () {
    return this.coords().id()
  }

  static #repositionSettlementsForRotation (settlements) {
    const keys = Object.values(SettlementKey)
    const shiftedKeys = [...keys.slice(1), keys[0]]

    const result = {}
    Object.values(keys).forEach((key, i) => {
      result[shiftedKeys[i]] = settlements[key]
    })
    return result
  }

  static #repositionRoadsForRotation (roads) {
    const keys = Object.values(RoadKey)
    const shiftedKeys = [...keys.slice(1), keys[0]]

    const result = {}
    Object.values(keys).forEach((key, i) => {
      result[shiftedKeys[i]] = roads[key]
    })
    return result
  }
}

export const SettlementKey = {
  mY: 'mY', // -Y (up)
  mXmY: 'mXmY', // -X, -Y (left, up)
  mXY: 'mXY', // -X, +Y (left, down)
  Y: 'Y', // +Y (down)
  XY: 'XY', // +X, +Y (right, down)
  XmY: 'XmY', // +X, -Y (right, up)
}

export const RoadKey = {
  X: 'X', // +X (right)
  XmY: 'XmY', // +X, -Y (right, up)
  mXmY: 'mXmY', // -X, -Y (left, up)
  mX: 'mX', // -X (left)
  mXY: 'mXY', // -X, +Y (left, down)
  XY: 'XY', // +X, +Y (right, down)
}
