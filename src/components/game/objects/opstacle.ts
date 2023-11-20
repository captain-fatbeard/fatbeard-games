import type Phaser from 'phaser'
import opstacle from './../assets/opstacle.svg'

function spawnObstacle(this: Phaser.Scene, gameDimentions: Phaser.Structs.Size) {
  const obstacle = this.add.image(
    gameDimentions.width + 200 / 2,
    gameDimentions.height,
    'opstacle',
  ) as any
  obstacle.setOrigin(1)

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

export default class Opstacle {
  static preload(scene: Phaser.Scene) {
    scene.load.svg('opstacle', opstacle, { width: 200, height: 200 })
  }

  static create(scene: Phaser.Scene, gameDimentions: Phaser.Structs.Size) {
    // Spawn the initial obstacle
    return spawnObstacle.call(scene, gameDimentions)
  }
}
