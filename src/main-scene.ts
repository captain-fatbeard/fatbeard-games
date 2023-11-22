import { Scene } from 'phaser'
import { Background, GameOver, Logo, Obstacles, Player, Points, ScoreElem, Start } from './components'

export class MainScene extends Scene {
  private background: Background
  private player: Player
  private start: Start
  private gameOver: GameOver
  private logo: Logo
  private points: Points
  private obstacles: Obstacles
  private scoreElem: ScoreElem

  score: number
  scoreText: any
  gameIsRunning: boolean
  gameIsOver: boolean
  stagedPlayer: any

  constructor() {
    super()
    this.background = new Background()
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
    this.background.preload(this)
    this.player.preload(this)
    this.start.preload(this)
    this.logo.preload(this)
    this.points.preload(this)
    this.obstacles.preload(this)
  }

  create() {
    this.background.create(this)
    this.stagedPlayer = this.player.create(this)
    this.start.create(this)
    this.gameOver.create(this)
    this.logo.create(this)
    this.scoreElem.create(this)
  }

  update() {
    this.background.update(this)
    this.gameOver.update(this)
    this.logo.update(this)
    this.points.update(this, this.stagedPlayer)
    this.obstacles.update(this, this.stagedPlayer)
    this.scoreElem.update(this)
  }
}
