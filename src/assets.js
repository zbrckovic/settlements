import { Assets } from 'pixi.js';

export const createAssetsLibrary = async () => {
    await Assets.init({ manifest: 'assets/manifest.json' });

    const loadBoardScreenBundle = async () => {
        return await Assets.loadBundle('board-screen');
    };

    return { loadBoardScreenBundle };
};
