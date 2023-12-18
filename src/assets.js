import { Assets } from 'pixi.js'

export class AssetsLibrary {
  static async init () {
    await Assets.init({ manifest: 'assets/manifest.json' })
  }

  static async loadBoardScreenBundle () {
    return await Assets.loadBundle('board-screen')
  }
}
