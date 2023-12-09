import { Application, Sprite } from 'pixi.js';
import './assets';
import { createAssetsLibrary } from './assets';

const startApp = async () => {
    const assetsLibrary = await createAssetsLibrary();
    const boardScreenBundle = await assetsLibrary.loadBoardScreenBundle();

    const app = new Application({ width: 640, height: 360 });
    globalThis.__PIXI_APP__ = app;

    document.body.appendChild(app.view as any);

    const sprite = Sprite.from(boardScreenBundle.plane);
    app.stage.addChild(sprite);

    // Add a variable to count up the seconds our demo has been running
    let elapsed = 0.0;

    // Tell our application's ticker to run a new callback every frame, passing
    // in the amount of time that has passed since the last tick
    app.ticker.add((delta) => {
        // Add the time to our total elapsed time
        elapsed += delta;
        // Update the sprite's X position based on the cosine of our elapsed time.  We divide
        // by 50 to slow the animation down a bit...
        sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
    });
};

startApp()
    .then(() => console.log('App started'))
    .catch((err) => console.error(err));
