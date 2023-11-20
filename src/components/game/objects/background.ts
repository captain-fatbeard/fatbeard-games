import type Phaser from 'phaser'

import waves from './../assets/waves.svg'

export default class Background {
  static preload(scene: Phaser.Scene, gameWidthInPixels: number) {
    scene.load.svg('waves', waves, { width: gameWidthInPixels })
  }

  static create(scene: Phaser.Scene, gameWidthInPixels: number) {
    const background = scene.add.tileSprite(0, 400, gameWidthInPixels, 600, 'waves')
    background.setName('background')
    background.setOrigin(0, 0)
    background.setTileScale(1, 1)
    background.setTilePosition(background.tilePositionX - 2, 0)
  }

  static update(scene: Phaser.Scene, gameIsRunning: boolean) {
    const background = scene.children.getByName('background') as any
    if (background && gameIsRunning)
      background.setTilePosition(background.tilePositionX + 7, 0)
  }
}
