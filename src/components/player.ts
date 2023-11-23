import { colors, config } from '../config'
import { calculateScale } from '../helpers/scale'
import type { MainScene } from '../main-scene'
import charactorWalk1 from './../assets/charactor/charactor-walk-1.png'
import charactorWalk2 from './../assets/charactor/charactor-walk-2.png'
import charactorStanding from './../assets/charactor/charactor-standing.png'
import charactoDead from './../assets/charactor/charactor-dead.png'

export class Player {
  preload(scene: MainScene) {
    scene.load.image('charactor-walk-1', charactorWalk1)
    scene.load.image('charactor-walk-2', charactorWalk2)
    scene.load.image('charactor-standing', charactorStanding)
    scene.load.image('charactor-dead', charactoDead)
  }

  create(scene: MainScene) {
    const gameDimensions = scene.game.scale.gameSize
    const image = {
      width: 243,
      height: 272,
    }

    const scale = calculateScale({
      screenHeight: gameDimensions.height,
      imageWidth: image.width,
      imageHeight: image.height,
      fractionOfScreen: 1 / 5,
    })

    const player = scene.add.sprite(
      image.width * scale,
      gameDimensions.height,
      'charactor-standing',
    ).setName('player').setScale(scale)

    // Define animations
    scene.anims.create({
      key: 'walking',
      frames: [
        { key: 'charactor-standing' },
        { key: 'charactor-walk-1' },
        { key: 'charactor-walk-2' },
      ],
      frameRate: 10,
      repeat: -1,
    })

    scene.physics.world.enable(player)
    const playerBody = player.body as Phaser.Physics.Arcade.Body
    playerBody.setBounce(0)
    playerBody.setCollideWorldBounds(true)

    // hitbox
    const hitboxAlpha = config.physics.arcade.debug ? 0.2 : 0
    const hitbox = scene.add.rectangle(
      image.width * scale,
      gameDimensions.height,
      image.width / 2,
      image.height,
      colors.hitbox,
    )
      .setScale(scale)
      .setAlpha(hitboxAlpha) as Phaser.GameObjects.Rectangle

    scene.physics.world.enable(hitbox)

    const hitboxBody = hitbox.body as Phaser.Physics.Arcade.Body
    hitboxBody.setBounce(0.1)
    hitboxBody.setCollideWorldBounds(true)

    // jumping action
    const screenHeight = gameDimensions.height
    const targetHeight = 0 // The top of the screen
    const jumpHeight = screenHeight - targetHeight

    scene.input.on('pointerdown', () => {
      if (!scene.gameIsRunning || scene.gameIsOver || !hitboxBody)
        return

      if (playerBody.velocity.y < 100 && playerBody.velocity.y > -5) {
        playerBody.setVelocityY(-jumpHeight)
        hitboxBody.setVelocityY(-jumpHeight)
      }
    })

    return hitboxBody
  }

  update(scene: MainScene) {
    const player = scene.children.getByName('player') as Phaser.GameObjects.Sprite
    const playerBody = player.body as Phaser.Physics.Arcade.Body

    if (!player && !playerBody)
      return

    if (playerBody.velocity.y < -5 || playerBody.velocity.y > 100)
      player.setTexture('charactor-walk-2')

    else if (!player.anims.isPlaying && scene.gameIsRunning)
      player.play('walking')

    if (scene.gameIsOver) {
      player.setTexture('charactor-dead')
      player.stop()
    }
  }
}
