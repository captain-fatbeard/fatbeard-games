import Phaser from 'phaser'
import { MainScene } from './main-scene'
import { calculateGravity } from './helpers/gravity'

const colors = {
  red: 0xFF0000,
  white: '#FFFFFF',
  black: '#000000',
  blue: '#000F9F',
  lightBlue: 0xADD8E6,
  hitbox: 0x00FF00,
  background: 0xFFFFFF,
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: calculateGravity() },
      debug: !!window.location.href.includes('debug'),
      fps: 60,
    },
  },
  scene: MainScene,
  backgroundColor: window.location.href.includes('xmas') ? colors.lightBlue : colors.background,
}

export { config, colors }
