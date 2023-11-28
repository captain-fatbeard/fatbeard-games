import type { MainScene } from '../main-scene'
import { colors } from '../config'
import pointImage from './../assets/point.png'

export class ScoreElem {
  preload(scene: MainScene) {
    scene.load.image('score-image', pointImage)
  }

  create(scene: MainScene) {
    const gameDimensions = scene.game.scale.gameSize
    const container = scene.add.container(gameDimensions.width - 200, 10).setName('scoreContainer')

    const text = scene.add.text(100, 0, '0X', { fontSize: '40px', color: colors.blue, fontStyle: 'bold' })
      .setName('score-text')

    const image = scene.add.image(150, 0, 'score-image')
      .setScale(0.35)
      .setOrigin(0) as Phaser.GameObjects.Image

    container.add(text)
    container.add(image)
  }

  update(scene: MainScene) {
    const scoreContainer = scene.children.getByName('scoreContainer') as Phaser.GameObjects.Container
    if (scoreContainer && scene.gameIsRunning)
      scoreContainer.setVisible(true)

    const scoreText = scoreContainer.getByName('score-text') as Phaser.GameObjects.Text

    if (scoreText && scene.gameIsRunning) {
      scoreText.setText(`${scene.score}X`)
      if (scene.score > 9)
        scoreText.setX(75)

      if (scene.score > 99)
        scoreText.setX(50)

      if (scene.score > 999)
        scoreText.setX(25)
    }
  }
}
