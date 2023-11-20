import type Phaser from 'phaser'
import startButton from './../assets/start-button.svg'

export default class Start {
  static preload(scene: Phaser.Scene) {
    scene.load.svg('start-button', startButton, { width: 200, height: 200 })
  }

  static create(scene: Phaser.Scene, gameDimentions: Phaser.Structs.Size) {
    const button = scene.add.image(
      gameDimentions.width / 2,
      gameDimentions.height / 2,
      'start-button',
    ).setInteractive() as any
    button.setOrigin(0.5)
    button.setScale(1)

    button.on('pointerover', () => {
      button.setTint(0xCCCCCC)
      scene.input.setDefaultCursor('pointer')
    })

    button.on('pointerout', () => {
      button.clearTint()
      scene.input.setDefaultCursor('auto')
    })

    return button
  }
}
