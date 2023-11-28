import type { MainScene } from '../main-scene'
import startButton from './../assets/start-button.png'

export class Start {
  preload(scene: MainScene) {
    scene.load.image('start-button', startButton)
  }

  create(scene: MainScene) {
    const gameDimensions = scene.game.scale.gameSize

    const button = scene.add.image(
      gameDimensions.width / 2,
      gameDimensions.height / 2,
      'start-button',
    )
      .setInteractive()
      .setOrigin(0.5)
      .setScale(1)
      .setName('start') as Phaser.GameObjects.Image

    button.on('pointerover', () => {
      button.setTint(0xCCCCCC)
      scene.input.setDefaultCursor('pointer')
    })

    button.on('pointerout', () => {
      button.clearTint()
      scene.input.setDefaultCursor('auto')
    })

    button.on('pointerdown', () => {
      setTimeout(() => {
        scene.gameIsRunning = true
      }, 200)
    })

    return button
  }

  update(scene: MainScene) {
    const elem = scene.children.getByName('start') as Phaser.GameObjects.Text

    if (elem && (!scene.gameIsRunning && !scene.gameIsOver))
      elem.setVisible(true)

    else
      elem.setVisible(false)
  }
}
