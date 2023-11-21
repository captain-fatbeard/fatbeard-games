import './style.css'
import { Game } from 'phaser'
import { config } from './config'

const _game = new Game(config)
_game.scene.start('main-scene')
