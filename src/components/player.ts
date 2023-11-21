import type { MainScene } from '../main-scene'
import charactor from './../assets/charactor.svg'

export class Player {
  preload(scene: MainScene) {
    scene.load.svg('charactor', charactor, { width: 243, height: 272 })
  }

  create(scene: MainScene) {
    const elem = scene.add.image(
      300,
      scene.game.config.height as number,
      'charactor',
    ) as Phaser.GameObjects.Image
    elem.setOrigin(1)
    elem.setScale(1)

    const colliderElem = scene.add.rectangle(
      220,
      scene.game.config.height as number,
      150, // Set the width of the player rectangle
      elem.height,
      0x00FF00, // Set the color of the player rectangle
    ) as Phaser.GameObjects.Rectangle
    colliderElem.setOrigin(1)
    colliderElem.setScale(1)
    colliderElem.setAlpha(0.2)

    scene.physics.world.enable(elem)
    scene.physics.world.enable(colliderElem)

    const elemBody = elem.body as Phaser.Physics.Arcade.Body
    elemBody.setBounce(0.1)
    elemBody.setCollideWorldBounds(true)

    const colliderElemBody = colliderElem.body as Phaser.Physics.Arcade.Body
    colliderElemBody.setBounce(0.1)
    colliderElemBody.setCollideWorldBounds(true)

    scene.input.on('pointerdown', () => {
      if (scene.gameIsOver || !colliderElemBody)
        return

      if (elemBody.velocity.y < 2 && elemBody.velocity.y > -2) {
        elemBody.setVelocityY(-600)
        colliderElemBody.setVelocityY(-600)
      }
    })

    return colliderElemBody
  }
}
