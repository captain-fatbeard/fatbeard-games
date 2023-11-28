import type Phaser from 'phaser'
import type { MainScene } from '../main-scene'
import { calculateScale } from '../helpers/scale'
import pointImage from './../assets/point.png'

export class Points {
  preload(scene: MainScene) {
    scene.load.image('point', pointImage)
  }

  update(scene: MainScene, player: Phaser.Physics.Arcade.Sprite) {
    const elem = scene.children.getByName('point') as Phaser.GameObjects.Image

    if (!elem && scene.gameIsRunning)
      createElem(scene, player)

    if (elem && scene.gameIsRunning) {
      const speed = 0.4
      const wobbleAmount = 3
      const wobbleSpeed = 0.01
      const deltaTime = scene.game.loop.delta / 1000

      elem.setX(elem.x - speed * scene.game.scale.width * deltaTime) // 800 is the base width for the speed reference
      elem.setAngle(Math.sin(scene.time.now * wobbleSpeed) * wobbleAmount)
    }

    if (elem && (scene.gameIsRunning && elem.x < 0) || elem && scene.gameIsOver)
      elem.destroy()
  }
}

function createElem(scene: MainScene, player: Phaser.Physics.Arcade.Sprite) {
  const point = spawn.call(scene)

  const handleCollision = () => {
    scene.score += 1

    const elem = scene.children.getByName('point') as Phaser.GameObjects.Image
    elem.destroy()
  }

  scene.physics.add.overlap(player, point, handleCollision, undefined, scene)
}

function spawn(this: MainScene) {
  const gameDimensions = this.game.scale.gameSize
  const image = {
    width: 243,
    height: 272,
  }

  const spawnHeight = Math.floor(Math.random() * gameDimensions.height / 2)

  const scale = calculateScale({
    screenHeight: gameDimensions.height,
    imageWidth: image.width,
    imageHeight: image.height,
    fractionOfScreen: 1 / 3,
  })

  const elem = this.add.image(
    gameDimensions.width + 200,
    gameDimensions.height - spawnHeight,
    'point',
  )
    .setOrigin(1)
    .setScale(scale)
    .setName('point') as Phaser.GameObjects.Image

  this.physics.world.enable(elem)
  const body = elem.body as Phaser.Physics.Arcade.Body
  body.setAllowGravity(false)

  return elem
}
