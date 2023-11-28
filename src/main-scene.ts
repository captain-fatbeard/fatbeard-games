import { Scene } from 'phaser'
import { Fps, GameOver, Logo, Obstacles, Player, Points, ScoreElem, Snow, Start, Waves } from './components'

export class MainScene extends Scene {
  private fps: Fps
  private waves: Waves
  private player: Player
  private start: Start
  private gameOver: GameOver
  private logo: Logo
  private points: Points
  private obstacles: Obstacles
  private scoreElem: ScoreElem
  private snow: Snow
  private xmas: boolean = window.location.href.includes('xmas')
  private debug: boolean = window.location.href.includes('debug')

  score: number
  gameIsRunning: boolean
  gameIsOver: boolean
  stagedPlayer: any

  constructor() {
    super()
    this.fps = new Fps()
    this.waves = new Waves()
    this.player = new Player()
    this.start = new Start()
    this.gameOver = new GameOver()
    this.logo = new Logo()
    this.points = new Points()
    this.obstacles = new Obstacles()
    this.scoreElem = new ScoreElem()
    this.snow = new Snow()

    this.score = 0
    this.gameIsRunning = false
    this.gameIsOver = false
  }

  preload() {
    this.waves.preload(this)
    this.player.preload(this)
    this.start.preload(this)
    this.logo.preload(this)
    this.points.preload(this)
    this.obstacles.preload(this)
    this.scoreElem.preload(this)
    this.gameOver.preload(this)
    if (this.xmas)
      this.snow.preload(this)
  }

  create() {
    if (this.debug)
      this.fps.create(this)

    this.waves.create(this)
    this.stagedPlayer = this.player.create(this)
    this.start.create(this)
    this.gameOver.create(this)
    this.logo.create(this)
    this.scoreElem.create(this)
    if (this.xmas)
      this.snow.create(this)
  }

  update() {
    if (this.debug)
      this.fps.update(this)

    this.waves.update(this)
    this.player.update(this)
    this.gameOver.update(this)
    this.logo.update(this)
    this.points.update(this, this.stagedPlayer)
    this.obstacles.update(this, this.stagedPlayer)
    this.scoreElem.update(this)
    this.scoreElem.update(this)
    this.start.update(this)
  }
}
