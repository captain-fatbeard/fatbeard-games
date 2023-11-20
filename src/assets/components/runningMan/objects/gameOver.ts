import type Phaser from 'phaser'

export default class GameOver {
  static create(scene: Phaser.Scene, gameWidthInPixels: number) {
    const gameOverText = scene.add.text(
      gameWidthInPixels as number / 2,
      600 / 2,
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

  static update(scene: Phaser.Scene, gameOver: boolean) {
    const elem = scene.children.getByName('gameOver') as Phaser.GameObjects.Text
    if (elem && gameOver && !elem.visible && !scene.physics.world.isPaused)
      elem.setVisible(true)
  }
}
