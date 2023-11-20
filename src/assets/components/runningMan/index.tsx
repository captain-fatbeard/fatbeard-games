import React, { useEffect } from 'react'
import Phaser from 'phaser'

// assets
import charactor from './assets/charactor.svg'
import opstacle from './assets/opstacle.svg'
import waves from './assets/waves.svg'

const RunningMan: React.FC = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: '100%',
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 600 }, // Adjust the gravity value as needed
          debug: true, // Set to true for physics debugging
        },
      },
      scene: {
        preload,
        create,
        update,
      },
      backgroundColor: '#ADD8E6',
      parent: 'game-container',
    }

    const game = new Phaser.Game(config)
    const parentElement = game.scale.parent
    const gameWidthInPixels = parentElement.offsetWidth

    let gameOverText: Phaser.GameObjects.Text
    let timer: Phaser.GameObjects.Text

    function preload(this: Phaser.Scene) {
      this.load.svg('charactor', charactor, { width: 200 })
      this.load.svg('opstacle', opstacle, { width: 200, height: 200 })
      this.load.svg('waves', waves, { width: gameWidthInPixels })
    }

    function create(this: Phaser.Scene & { initialTime?: number }) {
      // Load the waves SVG as a tile sprite
      const background = this.add.tileSprite(0, 400, gameWidthInPixels, 600, 'waves')
      background.setName('background')
      background.setOrigin(0, 0)
      background.setTileScale(1, 1)
      background.setTilePosition(background.tilePositionX - 2, 0)

      // Load the character SVG as an image
      const player = this.add.image(0, 0, 'charactor') as any
      player.setOrigin(0.5)
      player.setScale(1)

      // Enable the player for physics
      this.physics.world.enable(player)

      if (player.body) {
        player.body.setBounce(0.1)
        player.body.setCollideWorldBounds(true)
      }

      // Handle mouse click event
      this.input.on('pointerdown', () => {
        if (player.body && player.body.velocity.y < 2 && player.body.velocity.y > -2)
          player.body.setVelocityY(-600) // Set a negative value to make it jump up
      })

      // Spawn the initial obstacle
      const obstacle = spawnObstacle.call(this)

      // Add collider between player and obstacle
      this.physics.add.collider(player, obstacle, handleCollision, undefined, this)

      // Create game over text
      gameOverText = this.add.text(
        gameWidthInPixels as number / 2,
        game.config.height as number / 2,
        'Game Over',
        {
          fontSize: '32px',
          color: '#ff0000',
        },
      )
      gameOverText.setOrigin(0.5)
      gameOverText.setVisible(false)

      // Create timer text
      this.initialTime = 0
      timer = this.add.text(32, 32, `Timer: ${this.initialTime}`, {
        fontSize: '20px',
        color: '#ff0000',
      })
      this.time.addEvent({ delay: 1000, callback: updateTime, callbackScope: this, loop: true })
    }

    function update(this: Phaser.Scene) {
      const background = this.children.getByName('background') as any
      if (background)
        background.setTilePosition(background.tilePositionX + 7, 0)
    }

    function updateTime(this: Phaser.Scene & { initialTime: number }) {
      this.initialTime += 1 // One second
      timer.setText(`Timer: ${this.initialTime}`)
    }

    function spawnObstacle(this: Phaser.Scene) {
      const obstacle = this.add.image(
        gameWidthInPixels + 200 / 2,
        500,
        'opstacle',
      ) as any

      this.tweens.add({
        targets: obstacle,
        x: -100,
        duration: 3000,
        repeat: -1,
      })

      // Enable the obstacle for physics && Disable gravity for the obstacle
      this.physics.world.enable(obstacle)
      obstacle.body.setAllowGravity(false)

      return obstacle
    }

    function handleCollision() {
      game.scene.pause('default')
      gameOverText.setVisible(true)
    }

    return () => {
      game.destroy(true)
    }
  }, [])

  return <div id="game-container" />
}

export default RunningMan
