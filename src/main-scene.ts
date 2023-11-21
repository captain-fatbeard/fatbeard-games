import { Scene } from 'phaser'
import { Background, GameOver, Logo, Obstacles, Player, Points, Start } from './components'

export class MainScene extends Scene {
  private background: Background
  private player: Player
  private start: Start
  private gameOver: GameOver
  private points: Points
  private obstacles: Obstacles
  private logo: Logo

  constructor() {
    super()
    this.background = new Background()
    this.player = new Player()
    this.start = new Start()
    this.gameOver = new GameOver()
    this.points = new Points()
    this.obstacles = new Obstacles()
    this.logo = new Logo()

    // this.score = 0
  }

  preload() {
    this.background.preload(this)
    this.player.preload(this)
    this.start.preload(this)
    this.logo.preload(this)
    this.points.preload(this)
    this.obstacles.preload(this)
  }

  create() {
    this.background.create(this)
    const player = this.player.create(this)
    this.start.create(this)
    this.gameOver.create(this)
    this.logo.create(this)

    this.points.create(this, player)
    this.obstacles.create(this, player)
  }

  update() {
    this.background.update(this, true)
    this.gameOver.update(this, false)
    this.logo.update(this, true)
  }
}
