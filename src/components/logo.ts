import type { MainScene } from '../main-scene'
import logo from './../assets/logo.svg'

export class Logo {
  preload(scene: MainScene) {
    scene.load.svg('logo', logo, { width: 200, height: 200 })
  }

  create(scene: MainScene) {
    const gameDimentions = scene.game.scale.gameSize

    const logo = scene.add.image(
      gameDimentions.width / 2,
      100,
      'logo',
    ).setInteractive() as any
    logo.setOrigin(0.5)
    logo.setScale(1)
    logo.setVisible(false)
    logo.setName('logo')

    return logo
  }

  update(scene: MainScene) {
    const elem = scene.children.getByName('logo') as any
    if (elem && scene.gameIsOver)
      elem.setVisible(true)
  }
}
