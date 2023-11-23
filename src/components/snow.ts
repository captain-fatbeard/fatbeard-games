import type { MainScene } from '../main-scene'

// Assuming 'snowflake' is the correct key for your snowflake image
import snowflake from './../assets/snow.png'

export class Snow {
  preload(scene: MainScene) {
    scene.load.image('snowflake', snowflake)
  }

  create(scene: MainScene) {
    const gameDimensions = scene.game.scale.gameSize

    scene.add.particles(-200, 0, 'snowflake', {
      x: { min: 100, max: gameDimensions.width + 200 },
      //   y: { min: 0, max: gameDimensions.height / 2 },
      quantity: 1,
      lifespan: 5000,
      gravityY: 100,
    })
  }
}
