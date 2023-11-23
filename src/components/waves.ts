import { calculateScale } from '../helpers/scale'
import type { MainScene } from '../main-scene'
import wavesImage from './../assets/waves.png'

export class Waves {
  preload(scene: MainScene) {
    scene.load.image('waves', wavesImage)
  }

  create(scene: MainScene) {
    const gameDimentions = scene.game.scale.gameSize
    const image = {
      width: 1789,
      height: 251,
    }
    const scale = calculateScale({
      screenHeight: gameDimentions.height,
      imageWidth: image.width,
      imageHeight: image.height,
      fractionOfScreen: 1 / 4,
    })

    const elem = scene.add.tileSprite(0, (gameDimentions.height - image.height * scale), gameDimentions.width, gameDimentions.height, 'waves')
    elem.setName('background')
    elem.setOrigin(0)
    elem.setTileScale(scale)
  }

  update(scene: MainScene) {
    const elem = scene.children.getByName('background') as any
    if (elem && scene.gameIsRunning)
      elem.setTilePosition(elem.tilePositionX + 7, 0)
  }
}
