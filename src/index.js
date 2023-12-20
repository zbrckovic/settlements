import '@pixi/graphics-extras'
import { Application, Container } from 'pixi.js'
import './assets'
import { AssetsLibrary } from './assets'
import { BoardView, Plane } from './presentation/graphics'
import { Board } from './game/board'
import { Tile, TileType } from './game/tile'
import { Coords } from './game/misc'

const HEIGHT = 900
const WIDTH = 1600

const angleBetweenAxes = Math.PI - Math.PI / 3
const tiltAngle = Math.PI / 6

const startApp = async () => {
  await AssetsLibrary.init()
  const boardScreenBundle = await AssetsLibrary.loadBoardScreenBundle()

  const app = new Application({ width: WIDTH, height: HEIGHT, antialias: true })
  globalThis.__PIXI_APP__ = app
  document.body.appendChild(app.view)

  const plane = Plane.create({ angleBetweenAxes, tiltAngle })
  const board = Board.create({
    tiles: [
      Tile.create({ type: TileType.Mountains, coords: Coords.create({ x: 0, y: 0 }) }),
      Tile.create({ type: TileType.Pasture, coords: Coords.create({ x: 1, y: 0 }) }),
      Tile.create({ type: TileType.Forest, coords: Coords.create({ x: 2, y: 0 }) }),

      Tile.create({ type: TileType.Fields, coords: Coords.create({ x: 0, y: 1 }) }),
      Tile.create({ type: TileType.Hills, coords: Coords.create({ x: 1, y: 1 }) }),
      Tile.create({ type: TileType.Pasture, coords: Coords.create({ x: 2, y: 1 }) }),
      Tile.create({ type: TileType.Hills, coords: Coords.create({ x: 3, y: 1 }) }),

      Tile.create({ type: TileType.Fields, coords: Coords.create({ x: 0, y: 2 }) }),
      Tile.create({ type: TileType.Forest, coords: Coords.create({ x: 1, y: 2 }) }),
      Tile.create({ type: TileType.Desert, coords: Coords.create({ x: 2, y: 2 }) }),
      Tile.create({ type: TileType.Forest, coords: Coords.create({ x: 3, y: 2 }) }),
      Tile.create({ type: TileType.Mountains, coords: Coords.create({ x: 4, y: 2 }) }),

      Tile.create({ type: TileType.Forest, coords: Coords.create({ x: 1, y: 3 }) }),
      Tile.create({ type: TileType.Mountains, coords: Coords.create({ x: 2, y: 3 }) }),
      Tile.create({ type: TileType.Fields, coords: Coords.create({ x: 3, y: 3 }) }),
      Tile.create({ type: TileType.Pasture, coords: Coords.create({ x: 4, y: 3 }) }),

      Tile.create({ type: TileType.Hills, coords: Coords.create({ x: 2, y: 4 }) }),
      Tile.create({ type: TileType.Fields, coords: Coords.create({ x: 3, y: 4 }) }),
      Tile.create({ type: TileType.Pasture, coords: Coords.create({ x: 4, y: 4 }) }),
    ]
  })

  function generateBoard () {
    //[pasture, forrest, fields, hills, mountains, desert]
    const fields = [4, 4, 4, 3, 3, 1]
    const tiles = []

    function generateTyle (j, i) {
      let temp
      do
        temp = Math.floor(Math.random() * 5)
      while (fields[temp] === 0 && fields.some(item => item !== 0))
      tiles[tiles.length] = Tile.create({
        type: resolveTyle(temp),
        coords: Coords.create({ x: j, y: i })
      })
      fields[temp] = fields[temp]--
    }

    for (let i = 0; i <= 4; i++) {
      if (i === 0 || i === 4) {
        for (let j = 0; j <= 2; j++) {
          generateTyle(j, i)
        }
      } else if (i === 1 || i === 3) {
        for (let j = 0; j <= 3; j++) {
          generateTyle(j, i)
        }
      } else {
        for (let j = 0; j <= 4; j++) {
          generateTyle(j, i)
        }
      }
    }
    return tiles
  }

  function resolveTyle (number) {
    //[pasture, forrest, fields, hills, mountains, desert]
    switch (number) {
      case 0:
        return TileType.Pasture
      case 1:
        return TileType.Forest
      case 2:
        return TileType.Fields
      case 3:
        return TileType.Hills
      case 4:
        return TileType.Mountains
      case 5:
        return TileType.Desert
    }
  }

  const boardContainer = new Container()
  const boardView = BoardView.create({ plane, assets: boardScreenBundle, board })
  boardContainer.addChild(boardView.container())

  app.stage.addChild(boardContainer)
}

startApp()
  .then(() => console.log('App started'))
  .catch((err) => console.error(err))
