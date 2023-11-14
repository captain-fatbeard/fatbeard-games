import React, { useEffect } from 'react'
import Phaser from 'phaser'

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
    }

    function create(this: Phaser.Scene & { initialTime?: number }) {
      const player = this.add.circle(100, 550, 50, 0x0000FF) as any
      player.setOrigin(0.5)

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

    function update() {
    }

    function updateTime(this: Phaser.Scene & { initialTime: number }) {
      this.initialTime += 1 // One second
      timer.setText(`Timer: ${this.initialTime}`)
    }

    function spawnObstacle(this: Phaser.Scene) {
      const obstacleHeight = 100

      const obstacle = this.add.rectangle(
        gameWidthInPixels + obstacleHeight / 2,
        game.config.height as number - obstacleHeight / 2,
        100,
        obstacleHeight,
        0xFF0000,
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
