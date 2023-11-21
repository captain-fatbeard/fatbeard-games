import type Phaser from 'phaser'
import type { MainScene } from '../main-scene'

export class GameOver {
  create(scene: MainScene) {
    const gameDimentions = scene.game.scale.gameSize

    const gameOverText = scene.add.text(
      gameDimentions.width / 2,
      gameDimentions.height / 2,
      `Game Over`,
      {
        fontSize: '32px',
        color: '#ff0000',
      },
    )
    gameOverText.setOrigin(0.5)
    gameOverText.setVisible(false)
    gameOverText.setName('gameOver')
  }

  update(scene: MainScene) {
    const elem = scene.children.getByName('gameOver') as Phaser.GameObjects.Text
    if (elem && scene.gameIsOver && !elem.visible && !scene.physics.world.isPaused)
      elem.setVisible(true)
  }
}
