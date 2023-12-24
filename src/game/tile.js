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
  #edges = {}
  #vertices = {}

  /** @private */
  constructor ({ type, coords }) {
    this.#type = type
    this.#coords = coords
    Object.values(TileEdgeKey).forEach(key => {
      this.#edges[key] = undefined
    })
    Object.values(TileVertexKey).forEach(key => {
      this.#vertices[key] = undefined
    })
  }

  type () { return this.#type }

  coords () { return this.#coords }

  edge(key) { return this.#edges[key] }

  vertex(key) { return this.#vertices[key] }

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

const TileEdgeKey = {
  X: 'X', // +X (right)
  XY: 'XY', // +X, +Y (right, down)
  mXY: 'mXY', // -X, +Y (left, down)
  mX: 'mX', // -X (left)
  mXmY: 'mXmY', // -X, -Y (left, up)
  XmY: 'XmY', // +X, -Y (right, up)
}

const TileVertexKey = {
  mY: 'mY', // -Y (up)
  XmY: 'XmY', // +X, -Y (right, up)
  XY: 'XY', // +X, +Y (right, down)
  Y: 'Y', // +Y (down)
  mXY: 'mXY', // -X, +Y (left, down)
  mXmY: 'mXmY', // -X, -Y (left, up)
}
