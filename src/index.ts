import '@pixi/graphics-extras';
import { Application, Container } from 'pixi.js';
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

    const leftContainer = new Container();
    app.stage.addChild(leftContainer);
    leftContainer.position.set(100, 100);

    const rightContainer = new Container();
    rightContainer.position.set(WIDTH / 2 + 300, 100);
    app.stage.addChild(rightContainer);

    const boardRenderer = createBoardRenderer(
        false,
        createPlane(Math.PI / 2),
        boardScreenBundle
    );
    const isoBoardRenderer = createBoardRenderer(
        true,
        createPlane(Math.PI - Math.PI / 3,),
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

    leftContainer.addChild(boardRenderer.renderBoard(board));
    rightContainer.addChild(isoBoardRenderer.renderBoard(board));
};

startApp()
    .then(() => console.log('App started'))
    .catch((err) => console.error(err));
