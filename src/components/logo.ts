import { calculateScale } from '../helpers/scale'
import type { MainScene } from '../main-scene'
import logo from './../assets/logo.png'

export class Logo {
  preload(scene: MainScene) {
    scene.load.image('logo', logo)
  }

  create(scene: MainScene) {
    const gameDimensions = scene.game.scale.gameSize
    const image = {
      width: 335,
      height: 246,
    }
    const scale = calculateScale({
      screenHeight: gameDimensions.height,
      imageWidth: image.width,
      imageHeight: image.height,
      fractionOfScreen: 1 / 2,
    })

    const logo = scene.add.image(
      gameDimensions.width / 2 + image.width * scale / 2,
      image.height * scale + 10,
      'logo',
    ).setInteractive() as any
    logo.setOrigin(1)
    logo.setScale(scale)
    logo.setVisible(false)
    logo.setName('logo')

    return logo
  }

  update(scene: MainScene) {
    const elem = scene.children.getByName('logo') as any
    if (elem && scene.gameIsOver)
      elem.setVisible(false)
  }
}
