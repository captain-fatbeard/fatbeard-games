import type Phaser from 'phaser'
import obstacleImage from './../assets/obstacle.svg'

function spawnObstacle(this: Phaser.Scene, gameDimentions: Phaser.Structs.Size) {
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

export default class Obstacle {
  static preload(scene: Phaser.Scene) {
    scene.load.svg('obstacle', obstacleImage, { width: 173, height: 471 })
  }

  static create(scene: Phaser.Scene, gameDimentions: Phaser.Structs.Size) {
    return spawnObstacle.call(scene, gameDimentions)
  }
}
