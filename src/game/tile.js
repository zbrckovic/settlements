export const TileType = {
  Pasture: 'Pasture',
  Forest: 'Forest',
  Fields: 'Fields',
  Hills: 'Hills',
  Mountains: 'Mountains',
  Desert: 'Desert'
}

export const createTile = function ({ type, coords }) {
  return Object.assign(
    Object.create(methods),
    { _type: type, _coords: coords }
  )
}

const methods = {
  type () { return this._type },
  setType (type) { this._type = type },
  coords () { return this._coords },
  setCoords (coords) { this._coords = coords },
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
}
