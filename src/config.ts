import Phaser from 'phaser'
import { MainScene } from './main-scene'

const colors = {
  red: '#FF0000',
  white: '#FFFFFF',
  black: '#000000',
  blue: '#0000FF',
  lightBlue: '#ADD8E6',
  hitbox: 0x00FF00,
}

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
  backgroundColor: colors.lightBlue,
}

export { config, colors }
