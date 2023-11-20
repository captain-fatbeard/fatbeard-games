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

    scene.physics.world.enable(player)

    if (player.body) {
      player.body.setBounce(0.1)
      player.body.setCollideWorldBounds(true)
    }

    scene.input.on('pointerdown', () => {
      if (player.body && player.body.velocity.y < 2 && player.body.velocity.y > -2)
        player.body.setVelocityY(-600)
    })

    return player
  }
}
