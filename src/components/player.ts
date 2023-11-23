import { colors, config } from '../config'
import { calculateScale } from '../helpers/scale'
import type { MainScene } from '../main-scene'
import charactor from './../assets/charactor.png'

export class Player {
  preload(scene: MainScene) {
    scene.load.image('charactor', charactor)
  }

  create(scene: MainScene) {
    const gameDimensions = scene.game.scale.gameSize
    const image = {
      width: 243,
      height: 272,
    }

    const scale = calculateScale({
      screenHeight: gameDimensions.height,
      imageWidth: image.width,
      imageHeight: image.height,
      fractionOfScreen: 1 / 3,
    })

    const elem = scene.add.image(
      image.width * scale,
      gameDimensions.height,
      'charactor',
    )
      .setScale(scale) as Phaser.GameObjects.Image

    const hitboxAlpha = config.physics.arcade.debug ? 0.2 : 0

    const hitbox = scene.add.rectangle(
      image.width * scale,
      gameDimensions.height,
      image.width / 2,
      image.height,
      colors.hitbox,
    )
      .setScale(scale)
      .setAlpha(hitboxAlpha) as Phaser.GameObjects.Rectangle

    scene.physics.world.enable(elem)
    scene.physics.world.enable(hitbox)

    const elemBody = elem.body as Phaser.Physics.Arcade.Body
    elemBody.setBounce(0.1)
    elemBody.setCollideWorldBounds(true)

    const hitboxBody = hitbox.body as Phaser.Physics.Arcade.Body
    hitboxBody.setBounce(0.1)
    hitboxBody.setCollideWorldBounds(true)

    const screenHeight = gameDimensions.height

    const targetHeight = 0 // The top of the screen
    const jumpHeight = screenHeight - targetHeight
    scene.input.on('pointerdown', () => {
      if (!scene.gameIsRunning || scene.gameIsOver || !hitboxBody)
        return

      if (elemBody.velocity.y < 5 && elemBody.velocity.y > -5) {
        elemBody.setVelocityY(-jumpHeight)
        hitboxBody.setVelocityY(-jumpHeight)
      }
    })

    return hitboxBody
  }
}
