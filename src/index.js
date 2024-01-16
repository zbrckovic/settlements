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

  const plane = Plane.from({ angleBetweenAxes, tiltAngle })
  const board = Board.from({
    tiles: [
      Tile.from({ type: TileType.Mountains, coords: Coords.from({ x: 0, y: 0 }) }),
      Tile.from({ type: TileType.Pasture, coords: Coords.from({ x: 1, y: 0 }) }),
      Tile.from({ type: TileType.Forest, coords: Coords.from({ x: 2, y: 0 }) }),

      Tile.from({ type: TileType.Fields, coords: Coords.from({ x: 0, y: 1 }) }),
      Tile.from({ type: TileType.Hills, coords: Coords.from({ x: 1, y: 1 }) }),
      Tile.from({ type: TileType.Pasture, coords: Coords.from({ x: 2, y: 1 }) }),
      Tile.from({ type: TileType.Hills, coords: Coords.from({ x: 3, y: 1 }) }),

      Tile.from({ type: TileType.Fields, coords: Coords.from({ x: 0, y: 2 }) }),
      Tile.from({ type: TileType.Forest, coords: Coords.from({ x: 1, y: 2 }) }),
      Tile.from({ type: TileType.Desert, coords: Coords.from({ x: 2, y: 2 }) }),
      Tile.from({ type: TileType.Forest, coords: Coords.from({ x: 3, y: 2 }) }),
      Tile.from({ type: TileType.Mountains, coords: Coords.from({ x: 4, y: 2 }) }),

      Tile.from({ type: TileType.Forest, coords: Coords.from({ x: 1, y: 3 }) }),
      Tile.from({ type: TileType.Mountains, coords: Coords.from({ x: 2, y: 3 }) }),
      Tile.from({ type: TileType.Fields, coords: Coords.from({ x: 3, y: 3 }) }),
      Tile.from({ type: TileType.Pasture, coords: Coords.from({ x: 4, y: 3 }) }),

      Tile.from({ type: TileType.Hills, coords: Coords.from({ x: 2, y: 4 }) }),
      Tile.from({ type: TileType.Fields, coords: Coords.from({ x: 3, y: 4 }) }),
      Tile.from({ type: TileType.Pasture, coords: Coords.from({ x: 4, y: 4 }) }),
    ]
  })

  function generateBoard() {
    const tileCounts = [4, 4, 4, 3, 3, 1];
    const tiles = [];

    function generateTile(j, i) {
      let temp;
      do {
        temp = Math.floor(Math.random() * 6);
      } while (tileCounts[temp] === 0 && tileCounts.some(item => item !== 0));
      tiles.push(Tile.from({
        type: resolveTile(temp),
        coords: Coords.from({ x: j, y: i })
      }));
      tileCounts[temp]--;
    }

    for (let i = 0; i <= 4; i++) {
      const maxJ = (i === 0 || i === 4) ? 2 : (i === 1 || i === 3) ? 3 : 4;
      for (let j = 0; j <= maxJ; j++) {
        generateTile(j, i);
      }
    }
    return tiles;
  }

  function resolveTile(number) {
    const tileTypes = [TileType.Pasture, TileType.Forest, TileType.Fields, TileType.Hills, TileType.Mountains, TileType.Desert];
    return tileTypes[number];
  }


  const boardContainer = new Container()
  const boardView = BoardView.from({ plane, assets: boardScreenBundle, board })
  boardContainer.addChild(boardView.container())

  app.stage.addChild(boardContainer)
}

startApp()
  .then(() => console.log('App started'))
  .catch((err) => console.error(err))
