import type { MainScene } from '../main-scene'
import startButton from './../assets/start-button.svg'

export class Start {
  preload(scene: MainScene) {
    scene.load.svg('start-button', startButton, { width: 296, height: 53 })
  }

  create(scene: MainScene) {
    const gameDimentions = scene.game.scale.gameSize

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

    button.on('pointerdown', () => {
      button.destroy()
      scene.gameIsRunning = true
    })

    return button
  }
}
