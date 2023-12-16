import '@pixi/graphics-extras'
import { Application, Container } from 'pixi.js'
import './assets'
import { createAssetsLibrary } from './assets'
import { createPlane, createBoardView } from './presentation/graphics'
import { createBoard } from './game/board'
import { createTile, TileType } from './game/tile'
import { createCoords } from './game/misc'

const HEIGHT = 900
const WIDTH = 1600

const angleBetweenAxes = Math.PI - Math.PI / 3
const tiltAngle = Math.PI / 6

const startApp = async () => {
  const assetsLibrary = await createAssetsLibrary()
  const boardScreenBundle = await assetsLibrary.loadBoardScreenBundle()

  const app = new Application({ width: WIDTH, height: HEIGHT, antialias: true })
  globalThis.__PIXI_APP__ = app
  document.body.appendChild(app.view)

  const plane = createPlane({ angleBetweenAxes, tiltAngle })
  const board = createBoard({
    tiles: [
      createTile({ type: TileType.Mountains, coords: createCoords({ x: 0, y: 0 }) }),
      createTile({ type: TileType.Pasture, coords: createCoords({ x: 1, y: 0 }) }),
      createTile({ type: TileType.Forest, coords: createCoords({ x: 2, y: 0 }) }),

      createTile({ type: TileType.Fields, coords: createCoords({ x: 0, y: 1 }) }),
      createTile({ type: TileType.Hills, coords: createCoords({ x: 1, y: 1 }) }),
      createTile({ type: TileType.Pasture, coords: createCoords({ x: 2, y: 1 }) }),
      createTile({ type: TileType.Hills, coords: createCoords({ x: 3, y: 1 }) }),

      createTile({ type: TileType.Fields, coords: createCoords({ x: 0, y: 2 }) }),
      createTile({ type: TileType.Forest, coords: createCoords({ x: 1, y: 2 }) }),
      createTile({ type: TileType.Desert, coords: createCoords({ x: 2, y: 2 }) }),
      createTile({ type: TileType.Forest, coords: createCoords({ x: 3, y: 2 }) }),
      createTile({ type: TileType.Mountains, coords: createCoords({ x: 4, y: 2 }) }),

      createTile({ type: TileType.Forest, coords: createCoords({ x: 1, y: 3 }) }),
      createTile({ type: TileType.Mountains, coords: createCoords({ x: 2, y: 3 }) }),
      createTile({ type: TileType.Fields, coords: createCoords({ x: 3, y: 3 }) }),
      createTile({ type: TileType.Pasture, coords: createCoords({ x: 4, y: 3 }) }),

      createTile({ type: TileType.Hills, coords: createCoords({ x: 2, y: 4 }) }),
      createTile({ type: TileType.Fields, coords: createCoords({ x: 3, y: 4 }) }),
      createTile({ type: TileType.Pasture, coords: createCoords({ x: 4, y: 4 }) }),
    ]
  })

  const boardContainer = new Container()
  const boardView = createBoardView({ plane, assets: boardScreenBundle, board })
  boardContainer.addChild(boardView.container())
  boardContainer.position.set(10, 10)

  app.stage.addChild(boardContainer)
}

startApp()
  .then(() => console.log('App started'))
  .catch((err) => console.error(err))
