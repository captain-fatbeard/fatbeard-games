import { colors } from '../config'
import { calculateScale } from '../helpers/scale'
import type { MainScene } from '../main-scene'
import charactor from './../assets/charactor.png'

export class Player {
  preload(scene: MainScene) {
    scene.load.image('charactor', charactor)
  }

  create(scene: MainScene) {
    const gameDimentions = scene.game.scale.gameSize
    const image = {
      width: 243,
      height: 272,
    }

    const scale = calculateScale({
      screenHeight: gameDimentions.height,
      imageWidth: image.width,
      imageHeight: image.height,
      fractionOfScreen: 1 / 3,
    })

    const elem = scene.add.image(
      image.width * scale,
      gameDimentions.height,
      'charactor',
    ) as Phaser.GameObjects.Image

    elem.setOrigin(0.5)
    elem.setScale(scale)

    const hitbox = scene.add.rectangle(
      image.width * scale,
      gameDimentions.height,
      image.width / 2,
      image.height,
      colors.hitbox,
    ) as Phaser.GameObjects.Rectangle
    hitbox.setOrigin(1)
    hitbox.setScale(scale)
    hitbox.setAlpha(0.2)

    scene.physics.world.enable(elem)
    scene.physics.world.enable(hitbox)

    const elemBody = elem.body as Phaser.Physics.Arcade.Body
    elemBody.setBounce(0.1)
    elemBody.setCollideWorldBounds(true)

    const hitboxBody = hitbox.body as Phaser.Physics.Arcade.Body
    hitboxBody.setBounce(0.1)
    hitboxBody.setCollideWorldBounds(true)

    const screenHeight = gameDimentions.height

    const targetHeight = 0 // The top of the screen
    const jumpHeight = screenHeight - targetHeight
    scene.input.on('pointerdown', () => {
      if (scene.gameIsOver || !hitboxBody)
        return

      if (elemBody.velocity.y < 2 && elemBody.velocity.y > -2) {
        elemBody.setVelocityY(-jumpHeight)
        hitboxBody.setVelocityY(-jumpHeight)
      }
    })

    return hitboxBody
  }
}
