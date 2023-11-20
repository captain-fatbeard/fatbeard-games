import type Phaser from 'phaser'
import logo from './../assets/logo.svg'

export default class Logo {
  static preload(scene: Phaser.Scene) {
    scene.load.svg('logo', logo, { width: 200, height: 200 })
  }

  static create(scene: Phaser.Scene, gameWidthInPixels: number) {
    const logo = scene.add.image(
      gameWidthInPixels as number / 2,
      100,
      'logo',
    ).setInteractive() as any
    logo.setOrigin(0.5)
    logo.setScale(1)
    logo.setVisible(false)
    logo.setName('logo')

    return logo
  }

  static update(scene: Phaser.Scene, gameOver: boolean) {
    const elem = scene.children.getByName('logo') as any
    if (elem && gameOver)
      elem.setVisible(true)
  }
}
