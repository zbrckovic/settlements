export const TileType = {
  Pasture: 'Pasture',
  Forest: 'Forest',
  Fields: 'Fields',
  Hills: 'Hills',
  Mountains: 'Mountains',
  Desert: 'Desert'
}

/**
 * @param props.type
 * @param props.coords
 */
export function createTile (props) {
  const {
    type: _type,
    coords: _coords
  } = props

  function type () { return _type }

  function coords () { return _coords }

  function abbreviation () {
    switch (type()) {
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

  function state () {
    return [type(), coords().state()]
  }

  return { type, coords, abbreviation, state }
}
