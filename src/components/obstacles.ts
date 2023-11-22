import type Phaser from 'phaser'
import type { MainScene } from '../main-scene'
import { calculateScale } from '../helpers/scale'
import obstacleImage from './../assets/obstacle.png'

export class Obstacles {
  preload(scene: MainScene) {
    scene.load.image('obstacle', obstacleImage)
  }

  update(scene: MainScene, player: Phaser.Physics.Arcade.Sprite) {
    const elem = scene.children.getByName('obstacle') as Phaser.GameObjects.Image

    if (!elem && scene.gameIsRunning)
      createObstacle(scene, player)

    if (elem && scene.gameIsRunning) {
      const speed = 7 // Adjust the speed as needed
      elem.setX(elem.x - speed * scene.game.scale.width / 800) // 800 is the base width for the speed reference

      if (elem.x + elem.width * elem.scaleX < 0)
        elem.destroy()
    }
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
  const image = {
    width: 173,
    height: 471,
  }
  const scale = calculateScale({
    screenHeight: gameDimentions.height,
    imageWidth: image.width,
    imageHeight: image.height,
    fractionOfScreen: 1 / 3,
  })

  const elem = this.add.image(
    gameDimentions.width + 200 / 2,
    gameDimentions.height,
    'obstacle',
  ) as Phaser.GameObjects.Image
  elem.setOrigin(1)
  elem.setScale(scale)
  elem.setName('obstacle')

  this.physics.world.enable(elem)
  const body = elem.body as Phaser.Physics.Arcade.Body
  body.setAllowGravity(false)

  return elem
}
