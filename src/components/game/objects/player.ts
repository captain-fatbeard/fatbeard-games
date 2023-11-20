import type Phaser from 'phaser'
import charactor from './../assets/charactor.svg'

export default class Player {
  static preload(scene: Phaser.Scene) {
    scene.load.svg('charactor', charactor, { width: 243, height: 272 })
  }

  static create(scene: Phaser.Scene) {
    const player = scene.add.image(
      300,
      scene.game.config.height as number,
      'charactor',
    ) as any
    player.setOrigin(1)
    player.setScale(1)

    const playerBody = scene.add.rectangle(
      220,
      scene.game.config.height as number,
      150, // Set the width of the player rectangle
      player.height,
      0x00FF00, // Set the color of the player rectangle
    ) as any
    playerBody.setOrigin(1)
    playerBody.setScale(1)
    playerBody.setAlpha(0.2)

    scene.physics.world.enable(player)
    scene.physics.world.enable(playerBody)

    if (player.body) {
      player.body.setBounce(0.1)
      player.body.setCollideWorldBounds(true)
      playerBody.body.setBounce(0.1)
      playerBody.body.setCollideWorldBounds(true)
    }

    scene.input.on('pointerdown', () => {
      if (player.body && player.body.velocity.y < 2 && player.body.velocity.y > -2)
        player.body.setVelocityY(-600)
      if (playerBody.body && playerBody.body.velocity.y < 2 && playerBody.body.velocity.y > -2)
        playerBody.body.setVelocityY(-600)
    })

    return playerBody
  }
}
