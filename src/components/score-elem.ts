import type { MainScene } from '../main-scene'
import { colors } from '../config'
import pointImage from './../assets/point.png'

export class ScoreElem {
  preload(scene: MainScene) {
    scene.load.image('point', pointImage)
  }

  create(scene: MainScene) {
    const gameDimentions = scene.game.scale.gameSize
    const image = {
      width: 243,
      height: 272,
    }
    const scale = 0.5

    const elem = scene.scoreText = scene.add.text(gameDimentions.width - 150, 15, '0X', { fontSize: '40px', color: colors.blue })
    elem.setVisible(true)
    elem.setName('scoreElem')

    const elem2 = scene.add.image(gameDimentions.width - (image.width / 2) / 2, (image.height * scale / 2) / 2, 'point') as Phaser.GameObjects.Image
    elem2.setVisible(true)
    elem2.setName('scoreElem')
    elem2.setScale(scale)
  }

  update(scene: MainScene) {
    const elem = scene.children.getByName('scoreElem') as Phaser.GameObjects.Text
    if (elem && scene.gameIsRunning)
      elem.setVisible(true)
  }
}
