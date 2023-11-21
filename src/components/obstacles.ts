import type Phaser from 'phaser'
import obstacleImage from './../assets/obstacle.svg'

export class Obstacles {
  preload(scene: Phaser.Scene) {
    scene.load.svg('obstacle', obstacleImage, { width: 173, height: 471 })
  }

  create(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite) {
    const obstacle = spawnObstacle.call(scene)

    scene.physics.add.overlap(player, obstacle, handleCollision, undefined, this)
  }
}

function spawnObstacle(this: Phaser.Scene) {
  const gameDimentions = this.game.scale.gameSize

  const obstacle = this.add.image(
    gameDimentions.width + 200 / 2,
    gameDimentions.height,
    'obstacle',
  ) as any
  obstacle.setOrigin(1)
  obstacle.setScale(0.5)

  this.tweens.add({
    targets: obstacle,
    x: -100,
    duration: 3000,
    repeat: -1,
  })

  this.physics.world.enable(obstacle)
  obstacle.body.setAllowGravity(false)

  return obstacle
}

function handleCollision(this: Phaser.Scene) {
  // gameOver = true
  // game.scene.pause('default')

  console.log('game over')
}
