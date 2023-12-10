import '@pixi/graphics-extras';
import { Application, Container } from 'pixi.js';
import './assets';
import { createAssetsLibrary } from './assets';
import { createIsometricProjection, createYInverter } from './geometry';
import { renderBoard } from './render-board';

const HEIGHT = 768;
const WIDTH = 1024;

const invertY = createYInverter(HEIGHT);

const startApp = async () => {
    const assetsLibrary = await createAssetsLibrary();
    const boardScreenBundle = await assetsLibrary.loadBoardScreenBundle();

    const app = new Application({ width: WIDTH, height: HEIGHT });
    globalThis.__PIXI_APP__ = app;
    document.body.appendChild(app.view as any);

    const ortContainer = new Container();
    app.stage.addChild(ortContainer);
    ortContainer.position.set(10, -10);

    const isoContainer = new Container();
    isoContainer.position.set(WIDTH / 2 + 10, -10);
    app.stage.addChild(isoContainer);

    ortContainer.addChild(renderBoard(p => p.mapY(invertY)));

    isoContainer.addChild(
        renderBoard(p => p.map(createIsometricProjection(Math.PI / 6, Math.PI / 3)).mapY(invertY))
    );
};

startApp()
    .then(() => console.log('App started'))
    .catch((err) => console.error(err));
