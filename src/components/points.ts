import type Phaser from 'phaser'
import pointImage from './../assets/point.svg'

function createPoint(scene: Phaser.Scene, gameDimentions: Phaser.Structs.Size, player: Phaser.Physics.Arcade.Sprite) {
  const point = spawn.call(scene, gameDimentions)

  const handleCollision = () => {
    console.log('score')
    point.destroy()
    createPoint(scene, gameDimentions, player) // Call the common function to recreate the point
  }

  scene.physics.add.overlap(player, point, handleCollision, undefined, scene)
}

function spawn(this: Phaser.Scene, gameDimentions: Phaser.Structs.Size) {
  const elem = this.add.image(
    gameDimentions.width + 200 / 2,
    gameDimentions.height - 200,
    'point',
  ) as any
  elem.setOrigin(1)
  elem.setScale(0.5)
  elem.setName('point')

  this.tweens.add({
    targets: elem,
    x: -100,
    duration: 5000,
    repeat: -1,
  })

  this.physics.world.enable(elem)
  elem.body.setAllowGravity(false)

  return elem
}

export class Points {
  preload(scene: Phaser.Scene) {
    scene.load.svg('point', pointImage, { width: 248, height: 240 })
  }

  create(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite) {
    const gameDimentions = scene.game.scale.gameSize

    createPoint(scene, gameDimentions, player)
  }
}
