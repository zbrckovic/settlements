import { Assets, Texture } from 'pixi.js';

export const createAssetsLibrary = async (): Promise<AssetsLibrary> => {
    await Assets.init({ manifest: 'assets/manifest.json' });

    const loadBoardScreenBundle = async (): Promise<BoardScreenBundle> => {
        return await Assets.loadBundle('board-screen');
    };

    return { loadBoardScreenBundle };
};

export interface AssetsLibrary {
    loadBoardScreenBundle: () => Promise<BoardScreenBundle>;
}

export interface BoardScreenBundle {
    plane: Texture;
    hex: Texture;
}
