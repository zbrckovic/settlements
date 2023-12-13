import '@pixi/graphics-extras';
import { Application } from 'pixi.js';
import './assets';
import { createAssetsLibrary } from './assets';
import { createBoardRenderer } from './board-renderer';
import { Board, Tile } from './game/board';
import { createPlane } from './geometry/plane';

const HEIGHT = 768;
const WIDTH = 1024;

const startApp = async () => {
    const assetsLibrary = await createAssetsLibrary();
    const boardScreenBundle = await assetsLibrary.loadBoardScreenBundle();

    const app = new Application({ width: WIDTH, height: HEIGHT });
    globalThis.__PIXI_APP__ = app;
    document.body.appendChild(app.view as any);

    const boardRenderer = createBoardRenderer(
        createPlane(Math.PI - Math.PI / 3, Math.PI / 6),
        boardScreenBundle
    );

    const board: Board = {
        tiles: [
            [Tile.Water, Tile.Water, Tile.Water, Tile.Water],
            [Tile.Water, Tile.Mountains, Tile.Mountains, Tile.Mountains, Tile.Water],
            [Tile.Water, Tile.Plains, Tile.Mountains, Tile.Forest, Tile.Mountains, Tile.Water],
            [
                Tile.Water,
                Tile.Mountains, Tile.Mountains, Tile.Desert, Tile.Mountains, Tile.Mountains,
                Tile.Water
            ],
            [undefined, Tile.Water, Tile.Hills, Tile.Mountains, Tile.Mountains, Tile.Mountains, Tile.Water],
            [undefined, undefined, Tile.Water, Tile.Mountains, Tile.Mountains, Tile.Mountains, Tile.Water],
            [undefined, undefined, undefined, Tile.Water, Tile.Water, Tile.Water, Tile.Water]
        ]
    };

    // Number of tiles which would be in the negative quadrant if we draw the board from 0, 0.
    let leftOverflow = 0;
    board.tiles.forEach((row, rowIndex) => {
        const firstTileIndex = row.findIndex((tile) => tile !== undefined);
        const tileLeftOverflow = rowIndex - firstTileIndex
        if (tileLeftOverflow > leftOverflow) {
            leftOverflow = tileLeftOverflow;
        }
    })

    const boardContainer = boardRenderer.renderBoard(board)
    boardContainer.position.set(WIDTH / 2 + 100, 100);
    app.stage.addChild(boardContainer);
};

startApp()
    .then(() => console.log('App started'))
    .catch((err) => console.error(err));
