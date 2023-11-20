import React, { useEffect } from 'react'
import Phaser from 'phaser'

import Player from './objects/player'
import Background from './objects/background'
import Obstacle from './objects/obstacle'
import Start from './objects/Start'
import GameOver from './objects/gameOver'
import Logo from './objects/logo'

const RunningMan: React.FC = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
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
    const gameDimentions = game.scale.gameSize

    let gameIsRunning = false
    let gameOver = false

    function preload(this: Phaser.Scene) {
      Start.preload(this)
      Background.preload(this, gameDimentions)
      Player.preload(this)
      Obstacle.preload(this)
      Logo.preload(this)
    }

    function create(this: Phaser.Scene & { initialTime?: number }) {
      Background.create(this, gameDimentions)
      GameOver.create(this, gameDimentions)
      Logo.create(this, gameDimentions)
      const startButton = Start.create(this, gameDimentions)
      const player = Player.create(this)

      startButton.on('pointerdown', () => {
        gameIsRunning = true
        startButton.destroy()
        const obstacle = Obstacle.create(this, gameDimentions)
        this.physics.add.collider(player, obstacle, handleCollision, undefined, this)
      })
    }

    function update(this: Phaser.Scene) {
      Background.update(this, gameIsRunning)
      GameOver.update(this, gameOver)
      Logo.update(this, gameOver)
    }

    function handleCollision(this: Phaser.Scene) {
      gameOver = true
      game.scene.pause('default')
    }

    return () => {
      game.destroy(true)
    }
  }, [])

  return <div id="game-container" />
}

export default RunningMan
