import type Phaser from 'phaser'
import type { MainScene } from '../main-scene'
import { calculateScale } from '../helpers/scale'
import obstacleImage from './../assets/obstacle.png'

export class Obstacles {
  preload(scene: MainScene) {
    scene.load.image('obstacle-image', obstacleImage)
  }

  update(scene: MainScene, player: Phaser.Physics.Arcade.Sprite) {
    const elem = scene.children.getByName('obstacle') as Phaser.GameObjects.Image
    const elem2 = scene.children.getByName('obstacle2') as Phaser.GameObjects.Image
    const speed = 0.6 // Adjust the speed factor as needed
    const wobbleAmount = 3
    const wobbleSpeed = 0.01
    const secondObstacleChance = 0.4

    const deltaTime = scene.game.loop.delta / 1000 // Convert delta time to seconds

    if (!elem && !elem2 && scene.gameIsRunning) {
      createObstacle(scene, player)
      if (Math.random() < secondObstacleChance)
        createObstacle(scene, player, true)
    }

    if (elem && scene.gameIsRunning) {
      elem.setX(elem.x - speed * scene.game.scale.width * deltaTime)
      elem.setAngle(Math.sin(scene.time.now * wobbleSpeed) * wobbleAmount)
      if (elem.x + elem.width * elem.scaleX < 0)
        elem.destroy()
    }

    if (elem2 && scene.gameIsRunning) {
      elem2.setX(elem2.x - speed * scene.game.scale.width * deltaTime)
      elem2.setAngle(Math.sin(scene.time.now * wobbleSpeed) * wobbleAmount)
      if (elem2.x + elem2.width * elem2.scaleX < 0)
        elem2.destroy()
    }
  }
}

function createObstacle(scene: MainScene, player: Phaser.Physics.Arcade.Sprite, isSecondObstacle: boolean = false) {
  const obstacle = spawn.call(scene, isSecondObstacle)

  const handleCollision = () => {
    scene.gameIsOver = true
    scene.gameIsRunning = false
  }

  scene.physics.add.overlap(player, obstacle, handleCollision, undefined, scene)
}

function spawn(this: MainScene, isSecondObstacle: boolean = false) {
  const gameDimensions = this.game.scale.gameSize
  const image = {
    width: 173,
    height: 471,
  }
  const scale = calculateScale({
    screenHeight: gameDimensions.height,
    imageWidth: image.width,
    imageHeight: image.height,
    fractionOfScreen: 1 / 3,
  })
  const randomScaleMultiplier = 0.8 + Math.random() * 0.4
  const offsetX = isSecondObstacle ? image.width * scale : 0 // Adjust the offset as needed
  const obstacleName = isSecondObstacle ? 'obstacle2' : 'obstacle'

  const elem = this.add.image(
    gameDimensions.width + 200 / 2 + offsetX,
    gameDimensions.height,
    'obstacle-image',
  )
    .setOrigin(1)
    .setScale(scale * randomScaleMultiplier)
    .setName(obstacleName) as Phaser.GameObjects.Image

  this.physics.world.enable(elem)
  const body = elem.body as Phaser.Physics.Arcade.Body
  body.setAllowGravity(false)

  return elem
}
