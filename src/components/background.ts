import type { MainScene } from '../main-scene'
import waves from './../assets/waves.png'

export class Background {
  preload(scene: MainScene) {
    // const gameDimentions = scene.game.scale.gameSize
    // scene.load.svg('waves', waves, { width: scene.game.scale.gameSize.width, height: gameDimentions.height / 3 })

    scene.load.image('waves', waves)
  }

  create(scene: MainScene) {
    const gameDimentions = scene.game.scale.gameSize
    const elem = scene.add.tileSprite(0, gameDimentions.height - gameDimentions.height / 4, gameDimentions.width, gameDimentions.height / 3, 'waves')
    elem.setName('background')
    elem.setOrigin(0, 0)
    elem.setTileScale(1, 1)
    elem.setTilePosition(elem.tilePositionX - 2, 0)
  }

  update(scene: MainScene) {
    const background = scene.children.getByName('background') as any
    if (background && scene.gameIsRunning)
      background.setTilePosition(background.tilePositionX + 7, 0)
  }
}
