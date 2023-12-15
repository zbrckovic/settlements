const TileType = {
    Pasture: 'Pasture',
    Forest: 'Forest',
    Fields: 'Fields',
    Hills: 'Hills',
    Mountains: 'Mountains',
    Desert: 'Desert'
}

export const tile = (type, coordinates) => ({type, coordinates});

