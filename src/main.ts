// src/main.ts
import './style.css'
import * as Phaser from 'phaser'
import { MainScene } from './main-scene'
import { gameConfig } from './config'

const config: Phaser.Types.Core.GameConfig = {
  ...gameConfig,
  scene: MainScene,
}

const _game = new Phaser.Game(config)
