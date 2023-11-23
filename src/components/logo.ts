import { calculateScale } from '../helpers/scale'
import type { MainScene } from '../main-scene'
import logo from './../assets/logo.png'

export class Logo {
  private previousScore: number = 0
  private image = {
    width: 335,
    height: 246,
  }

  preload(scene: MainScene) {
    scene.load.image('logo', logo)
  }

  create(scene: MainScene) {
    const gameDimensions = scene.game.scale.gameSize
    const scale = calculateScale({
      screenHeight: gameDimensions.height,
      imageWidth: this.image.width,
      imageHeight: this.image.height,
      fractionOfScreen: 1 / 4,
    })

    const logo = scene.add.image(
      this.image.width * scale + this.image.width * scale,
      gameDimensions.height / 2 + this.image.height * scale / 2,
      'logo',
    ).setInteractive()
      .setOrigin(1)
      .setScale(0)
      .setAlpha(0)
      .setName('logo') as Phaser.GameObjects.Image

    return logo
  }

  update(scene: MainScene) {
    const logo = scene.children.getByName('logo') as any
    if (logo && scene.gameIsOver) {
      logo.setVisible(false)
    }
    else if (logo && scene.score > this.previousScore) {
      logo.setVisible(true)
      const targetScale = calculateScale({
        screenHeight: scene.game.scale.gameSize.height,
        imageWidth: this.image.width,
        imageHeight: this.image.height,
        fractionOfScreen: 1 / 4,
      })

      scene.tweens.add({
        targets: logo,
        scale: targetScale,
        duration: 1200,
        ease: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)',
        onComplete: () => {
          logo.setScale(0)
        },
      })

      scene.tweens.add({
        targets: logo,
        alpha: 0.8,
        duration: 1000,
        ease: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)',
        yoyo: true,
      })

      this.previousScore = scene.score
    }
  }
}
