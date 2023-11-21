import type Phaser from 'phaser'
import type { MainScene } from '../main-scene'
import obstacleImage from './../assets/obstacle.svg'

export class Obstacles {
  preload(scene: MainScene) {
    const gameDimentions = scene.game.scale.gameSize
    const scaledHeight = gameDimentions.height / 2
    // const scaledWidth = (scaledHeight / height) * width
    const scaledWidth = (scaledHeight / 471) * 173

    scene.load.svg('obstacle', obstacleImage, { width: scaledWidth, height: scaledHeight })
  }

  update(scene: MainScene, player: Phaser.Physics.Arcade.Sprite) {
    const elem = scene.children.getByName('obstacle') as Phaser.GameObjects.Image

    if (!elem && scene.gameIsRunning)
      createObstacle(scene, player)

    if (elem && scene.gameIsRunning)
      elem.setX(elem.x -= 7)

    if (elem && scene.gameIsRunning && elem.x < 0)
      elem.destroy()
  }
}

function createObstacle(scene: MainScene, player: Phaser.Physics.Arcade.Sprite) {
  const point = spawn.call(scene)

  const handleCollision = () => {
    scene.gameIsOver = true
    scene.gameIsRunning = false
  }

  scene.physics.add.overlap(player, point, handleCollision, undefined, scene)
}

function spawn(this: MainScene) {
  const gameDimentions = this.game.scale.gameSize

  const elem = this.add.image(
    gameDimentions.width + 200 / 2,
    gameDimentions.height,
    'obstacle',
  ) as Phaser.GameObjects.Image
  elem.setOrigin(1)
  elem.setScale(0.5)
  elem.setName('obstacle')

  this.physics.world.enable(elem)
  const body = elem.body as Phaser.Physics.Arcade.Body
  body.setAllowGravity(false)

  return elem
}
