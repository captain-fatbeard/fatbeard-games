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
      const speed = 4
      elem.setX(elem.x - speed * scene.game.scale.width / 800) // 800 is the base width for the speed reference
    }

    if (elem && (scene.gameIsRunning && elem.x < 0) || elem && scene.gameIsOver)
      elem.destroy()
  }
}

function createElem(scene: MainScene, player: Phaser.Physics.Arcade.Sprite) {
  const point = spawn.call(scene)

  const handleCollision = () => {
    scene.score += 1
    scene.scoreText.setText(`score: ${scene.score}`)

    const elem = scene.children.getByName('point') as Phaser.GameObjects.Image
    elem.destroy()
  }

  scene.physics.add.overlap(player, point, handleCollision, undefined, scene)
}

function spawn(this: MainScene) {
  const gameDimentions = this.game.scale.gameSize
  const image = {
    width: 243,
    height: 272,
  }
  const scale = calculateScale({
    screenHeight: gameDimentions.height,
    imageWidth: image.width,
    imageHeight: image.height,
    fractionOfScreen: 1 / 3,
  })

  const elem = this.add.image(
    gameDimentions.width + 200,
    gameDimentions.height - 200,
    'point',
  ) as Phaser.GameObjects.Image
  elem.setOrigin(1)
  elem.setScale(scale)
  elem.setName('point')

  this.physics.world.enable(elem)
  const body = elem.body as Phaser.Physics.Arcade.Body
  body.setAllowGravity(false)

  return elem
}
