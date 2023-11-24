import type { MainScene } from '../main-scene'

import snow from './../assets/snow.png'

export class Snow {
  preload(scene: MainScene) {
    scene.load.image('snowflake', snow)
  }

  create(scene: MainScene) {
    const gameDimensions = scene.game.scale.gameSize

    scene.add.particles(-200, 0, 'snowflake', {
      x: { min: 100, max: gameDimensions.width + 200 },
      quantity: 0.5,
      lifespan: 5000,
      gravityY: 100,
      scale: 1,
    })
  }
}
