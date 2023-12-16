import { Assets } from 'pixi.js'

export const createAssetsLibrary = async () => {
  await Assets.init({ manifest: 'assets/manifest.json' })

  return {
    async loadBoardScreenBundle () {
      return await Assets.loadBundle('board-screen')
    }
  }
}
