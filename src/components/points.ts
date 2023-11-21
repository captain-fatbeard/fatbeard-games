import type Phaser from 'phaser'
import type { MainScene } from '../main-scene'
import pointImage from './../assets/point.svg'

export class Points {
  preload(scene: MainScene) {
    scene.load.svg('point', pointImage, { width: 248, height: 240 })
  }

  create(scene: MainScene, player: Phaser.Physics.Arcade.Sprite) {
    const gameDimentions = scene.game.scale.gameSize

    createPoint(scene, gameDimentions, player)
  }

  update(scene: MainScene) {
    const elem = scene.children.getByName('point') as Phaser.GameObjects.Image
    if (elem && scene.gameIsRunning)
      elem.setX(elem.x -= 5)
  }
}

function createPoint(scene: MainScene, gameDimentions: Phaser.Structs.Size, player: Phaser.Physics.Arcade.Sprite) {
  const elem = spawn.call(scene, gameDimentions)

  const handleCollision = () => {
    scene.score += 1
    scene.scoreText.setText(`score: ${scene.score}`)

    elem.destroy()
    createPoint(scene, gameDimentions, player)
  }

  scene.physics.add.overlap(player, elem, handleCollision, undefined, scene)
}

function spawn(this: MainScene, gameDimentions: Phaser.Structs.Size) {
  const elem = this.add.image(
    gameDimentions.width + 200,
    gameDimentions.height - 200,
    'point',
  ) as Phaser.GameObjects.Image
  elem.setOrigin(1)
  elem.setScale(0.5)
  elem.setName('point')

  this.physics.world.enable(elem)
  const body = elem.body as Phaser.Physics.Arcade.Body
  body.setAllowGravity(false)

  return elem
}
