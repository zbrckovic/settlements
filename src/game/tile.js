import { Coords } from './misc'

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

  static fromPlain ({ type, coords }) {
    return this.from({ type, coords: Coords.from(coords) })
  }

  #type
  #coords

  /** @private */
  constructor ({ type, coords }) {
    this.#type = type
    this.#coords = coords
  }

  type () { return this.#type }

  coords () { return this.#coords }

  withCoords (coords) {
    return Tile.from({ type: this.type(), coords })
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
    return [this.type(), this.coords().plain()]
  }

  id () {
    return this.coords().id()
  }
}
