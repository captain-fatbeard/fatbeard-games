import './style.css'
import { Game } from 'phaser'
import { config } from './config'

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-new
  new Game(config)
})
