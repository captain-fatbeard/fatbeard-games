import type Phaser from 'phaser'
import startButton from './../assets/start-button.svg'

export default class Start {
  static preload(scene: Phaser.Scene) {
    scene.load.svg('start-button', startButton, { width: 200, height: 200 })
  }

  static create(scene: Phaser.Scene, gameWidthInPixels: number) {
    const button = scene.add.image(
      gameWidthInPixels as number / 2,
      600 / 2,
      'start-button',
    ).setInteractive() as any
    button.setOrigin(0.5)
    button.setScale(1)

    return button
  }
}
