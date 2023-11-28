import type Phaser from 'phaser'
import type { MainScene } from '../main-scene'
import gameOverImage from './../assets/game-over.png'

export class GameOver {
  preload(scene: MainScene) {
    scene.load.image('gameOver', gameOverImage)
  }

  create(scene: MainScene) {
    const gameDimensions = scene.game.scale.gameSize
    const image = {
      width: 243,
      height: 272,
    }
    const scale = 1

    const elem = scene.add.image(
      gameDimensions.width / 2,
      image.height / 2,
      'gameOver',
    )
      .setScale(scale)
      .setOrigin(0.5)
      .setVisible(false)
      .setName('gameOver')
      .setInteractive() as Phaser.GameObjects.Image

    elem.on('pointerdown', () => {
      scene.scene.restart()
      scene.score = 0
      scene.gameIsRunning = true
      scene.gameIsOver = false
    })
  }

  update(scene: MainScene) {
    const elem = scene.children.getByName('gameOver') as Phaser.GameObjects.Text
    if (elem && scene.gameIsOver)
      elem.setVisible(true)

    else
      elem.setVisible(false)
  }
}
