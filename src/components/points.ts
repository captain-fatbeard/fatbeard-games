import type Phaser from 'phaser'
import type { MainScene } from '../main-scene'
import elemImage from './../assets/point.svg'

export class Points {
  preload(scene: MainScene) {
    const gameDimentions = scene.game.scale.gameSize
    const scaledHeight = gameDimentions.height / 2
    // const scaledWidth = (scaledHeight / height) * width
    const scaledWidth = (scaledHeight / 240) * 248

    scene.load.svg('point', elemImage, { width: scaledWidth, height: scaledHeight })
  }

  update(scene: MainScene, player: Phaser.Physics.Arcade.Sprite) {
    const elem = scene.children.getByName('point') as Phaser.GameObjects.Image

    if (!elem && scene.gameIsRunning)
      createElem(scene, player)

    if (elem && scene.gameIsRunning)
      elem.setX(elem.x -= 4)

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
