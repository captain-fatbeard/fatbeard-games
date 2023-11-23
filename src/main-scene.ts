import { Scene } from 'phaser'
import { GameOver, Logo, Obstacles, Player, Points, ScoreElem, Start, Waves } from './components'

export class MainScene extends Scene {
  private waves: Waves
  private player: Player
  private start: Start
  private gameOver: GameOver
  private logo: Logo
  private points: Points
  private obstacles: Obstacles
  private scoreElem: ScoreElem

  score: number
  gameIsRunning: boolean
  gameIsOver: boolean
  stagedPlayer: any

  constructor() {
    super()
    this.waves = new Waves()
    this.player = new Player()
    this.start = new Start()
    this.gameOver = new GameOver()
    this.logo = new Logo()
    this.points = new Points()
    this.obstacles = new Obstacles()
    this.scoreElem = new ScoreElem()

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
  }

  create() {
    this.waves.create(this)
    this.stagedPlayer = this.player.create(this)
    this.start.create(this)
    this.gameOver.create(this)
    this.logo.create(this)
    this.scoreElem.create(this)
  }

  update() {
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
