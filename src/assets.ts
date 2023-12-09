import { Assets, Texture } from 'pixi.js';

export const createAssetsLibrary = async (): Promise<AssetsLibrary> => {
    await Assets.init({ manifest: 'assets/manifest.json' });

    const loadBoardScreenBundle = async (): Promise<BoardScreenBundle> => {
        return await Assets.loadBundle('board-screen');
    };

    return { loadBoardScreenBundle };
};

interface AssetsLibrary {
    loadBoardScreenBundle: () => Promise<BoardScreenBundle>;
}

interface BoardScreenBundle {
    plane: Texture;
}
