export const TileType = {
  Pasture: 'Pasture',
  Forest: 'Forest',
  Fields: 'Fields',
  Hills: 'Hills',
  Mountains: 'Mountains',
  Desert: 'Desert'
}

export class Tile {
  static create (props) {
    return new Tile(props)
  }

  #type
  #coords

  constructor ({ type, coords }) {
    this.#type = type
    this.#coords = coords
  }

  type () { return this.#type }

  coords () { return this.#coords }

  setCoords (coords) { this.#coords = coords }

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

  state () {
    return [this.type(), this.coords().state()]
  }
}
