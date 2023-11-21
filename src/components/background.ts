import type Phaser from 'phaser'
import waves from './../assets/waves.svg'

export class Background {
  preload(scene: Phaser.Scene) {
    scene.load.svg('waves', waves, { width: scene.game.scale.gameSize.width })
  }

  create(scene: Phaser.Scene) {
    const gameDimentions = scene.game.scale.gameSize

    const background = scene.add.tileSprite(0, gameDimentions.height - 200, gameDimentions.width, gameDimentions.height, 'waves')
    background.setName('background')
    background.setOrigin(0, 0)
    background.setTileScale(1, 1)
    background.setTilePosition(background.tilePositionX - 2, 0)
  }

  update(scene: Phaser.Scene, gameIsRunning: boolean) {
    const background = scene.children.getByName('background') as any
    if (background && gameIsRunning)
      background.setTilePosition(background.tilePositionX + 7, 0)
  }
}
