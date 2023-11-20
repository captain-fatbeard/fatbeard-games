import type Phaser from 'phaser'
import opstacle from './../assets/opstacle.svg'

function spawnObstacle(this: Phaser.Scene, gameWidthInPixels: number) {
  const obstacle = this.add.image(
    gameWidthInPixels + 200 / 2,
    500,
    'opstacle',
  ) as any

  this.tweens.add({
    targets: obstacle,
    x: -100,
    duration: 3000,
    repeat: -1,
  })

  // Enable the obstacle for physics && Disable gravity for the obstacle
  this.physics.world.enable(obstacle)
  obstacle.body.setAllowGravity(false)

  return obstacle
}

export default class Opstacle {
  static preload(scene: Phaser.Scene) {
    scene.load.svg('opstacle', opstacle, { width: 200, height: 200 })
  }

  static create(scene: Phaser.Scene, gameWidthInPixels: number) {
    // Spawn the initial obstacle
    return spawnObstacle.call(scene, gameWidthInPixels)
  }
}
