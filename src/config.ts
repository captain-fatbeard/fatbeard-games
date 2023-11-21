import Phaser from 'phaser'
import { MainScene } from './main-scene'

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: true,
    },
  },
  scene: MainScene,
  backgroundColor: '#ADD8E6',
}

const colors = {
  red: '#FF0000',
  white: '#FFFFFF',
  black: '#000000',
  blue: '#0000FF',
}

export { config, colors }
