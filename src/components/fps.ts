import type { MainScene } from '../main-scene'
import { colors } from '../config'

export class Fps {
  create(scene: MainScene) {
    const fps = scene.game.loop.actualFps.toFixed(2)

    scene.add.text(0, 0, `FPS: ${fps}`, { fontSize: '20px', color: colors.blue, fontStyle: 'bold' })
      .setName('fps')
  }

  update(scene: MainScene) {
    const text = scene.children.getByName('fps') as Phaser.GameObjects.Text
    const fps = scene.game.loop.actualFps.toFixed(2)

    if (text)
      text.setText(`fps: ${fps}`)
  }
}
