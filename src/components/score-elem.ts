import type { MainScene } from '../main-scene'
import { colors } from '../config'

export class ScoreElem {
  create(scene: MainScene) {
    const elem = scene.scoreText = scene.add.text(16, 16, 'score: 0', { fontSize: '20px', color: colors.red })
    elem.setVisible(false)
    elem.setName('scoreElem')
  }

  update(scene: MainScene) {
    const elem = scene.children.getByName('scoreElem') as Phaser.GameObjects.Text
    if (elem && scene.gameIsRunning)
      elem.setVisible(true)
  }
}
