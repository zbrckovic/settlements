export const TileType = {
  Pasture: 'Pasture',
  Forest: 'Forest',
  Fields: 'Fields',
  Hills: 'Hills',
  Mountains: 'Mountains',
  Desert: 'Desert'
}

export function createTile ({ type, coords }) {
  return {
    type () { return type },
    coords () { return coords },
    abbreviation () {
      switch (type) {
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
    },
    state () {
      return [type, coords.state()]
    }
  }
}
