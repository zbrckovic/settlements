import '@pixi/graphics-extras';
import { Application, Container, Graphics } from 'pixi.js';
import './assets';
import { createAssetsLibrary } from './assets';
import { createIsometricPlane } from './isometric-plane';
import { calculateHexPoints } from './geometry';

const HEIGHT = 768;
const WIDTH = 1024;

const fromInvertedY = (y: number) => HEIGHT - y;

const startApp = async () => {
    const assetsLibrary = await createAssetsLibrary();
    const boardScreenBundle = await assetsLibrary.loadBoardScreenBundle();

    const app = new Application({ width: WIDTH, height: HEIGHT });
    globalThis.__PIXI_APP__ = app;
    document.body.appendChild(app.view as any);

    const cartesianContainer = new Container();
    app.stage.addChild(cartesianContainer);
    cartesianContainer.position.set(10, -10);

    const isometricContainer = new Container();
    isometricContainer.position.set(WIDTH / 2 + 10, -10);
    app.stage.addChild(isometricContainer);


    const origin = { x: 100, y: 100 };
    const side = 100;
    const degInRad30 = Math.PI / 6;

    const hexPoints = calculateHexPoints(origin, side);

    cartesianContainer.addChild(
        new Graphics()
            .beginFill(0xff0000)
            .moveTo(hexPoints[0].x, fromInvertedY(hexPoints[0].y))
            .lineTo(hexPoints[1].x, fromInvertedY(hexPoints[1].y))
            .lineTo(hexPoints[2].x, fromInvertedY(hexPoints[2].y))
            .lineTo(hexPoints[3].x, fromInvertedY(hexPoints[3].y))
            .lineTo(hexPoints[4].x, fromInvertedY(hexPoints[4].y))
            .lineTo(hexPoints[5].x, fromInvertedY(hexPoints[5].y))
            .closePath()
    );

    const isoPlane = createIsometricPlane(
        2 * degInRad30,
        degInRad30
    );

    const isoPoints = hexPoints.map(isoPlane.isoToCar);

    isometricContainer.addChild(
        new Graphics()
            .beginFill(0xff0000)
            .moveTo(isoPoints[0].x, fromInvertedY(isoPoints[0].y))
            .lineTo(isoPoints[1].x, fromInvertedY(isoPoints[1].y))
            .lineTo(isoPoints[2].x, fromInvertedY(isoPoints[2].y))
            .lineTo(isoPoints[3].x, fromInvertedY(isoPoints[3].y))
            .lineTo(isoPoints[4].x, fromInvertedY(isoPoints[4].y))
            .lineTo(isoPoints[5].x, fromInvertedY(isoPoints[5].y))
            .closePath()
    );

};

startApp()
    .then(() => console.log('App started'))
    .catch((err) => console.error(err));
