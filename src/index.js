import '@pixi/graphics-extras'
import { Application } from 'pixi.js'
import './assets'
import { createAssetsLibrary } from './assets'
import { createBoardRenderer } from './board-renderer'
import { createPlane } from './geometry/plane'
import { createBoard } from './game/board'
import { createTile, TileType } from './game/tile'
import { createCoords } from './game/misc'

const HEIGHT = 768
const WIDTH = 1024

const startApp = async () => {
  const assetsLibrary = await createAssetsLibrary()
  const boardScreenBundle = await assetsLibrary.loadBoardScreenBundle()

  const app = new Application({ width: WIDTH, height: HEIGHT, antialias: true })
  globalThis.__PIXI_APP__ = app
  document.body.appendChild(app.view)

  const boardRenderer = createBoardRenderer(
    createPlane(Math.PI - Math.PI / 3, Math.PI / 6),
    boardScreenBundle
  )

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

  const boardContainer = boardRenderer.renderBoard(board)
  boardContainer.position.set(WIDTH / 2 + 100, 100)
  app.stage.addChild(boardContainer)
}

startApp()
  .then(() => console.log('App started'))
  .catch((err) => console.error(err))
