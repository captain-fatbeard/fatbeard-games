import type Phaser from 'phaser'

export class GameOver {
  create(scene: Phaser.Scene) {
    const gameDimentions = scene.game.scale.gameSize

    const gameOverText = scene.add.text(
      gameDimentions.width / 2,
      gameDimentions.height / 2,
      'Game Over',
      {
        fontSize: '32px',
        color: '#ff0000',
      },
    )
    gameOverText.setOrigin(0.5)
    gameOverText.setVisible(false)
    gameOverText.setName('gameOver')
  }

  update(scene: Phaser.Scene, gameOver: boolean) {
    const elem = scene.children.getByName('gameOver') as Phaser.GameObjects.Text
    if (elem && gameOver && !elem.visible && !scene.physics.world.isPaused)
      elem.setVisible(true)
  }
}
