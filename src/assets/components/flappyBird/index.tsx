import './styles.css'
import { useEffect, useMemo, useRef, useState } from 'react'

const gameSettings = {
  background: {
    width: 1280,
    height: 720,
    color: '#ADD8E6',
  },
  bird: {
    color: 'red',
    width: 50,
    height: 50,
    startX: 100,
    startY: 720 / 2,
    radius: 50 / 2,
  },
  walls: {
    width: 100,
    height: 600,
    gap: 270,
  },
  collisionBuffer: 20,
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function FlappyBird() {
  const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

  const game = useMemo(() => gameSettings, [])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [startGame, setStartGame] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [birdY, setBirdY] = useState(game.bird.startY)
  const [wallX, setWallX] = useState(game.background.width)
  const [wallPosition, setWallPosition] = useState(-350) // between -550 and -100
  const [wall2Position, setWall2Position] = useState(-500) // between -550 and -100
  const [wall2X, setWall2X] = useState(game.background.width + game.background.width / 2)
  const [gameSpeed, setGameSpeed] = useState(4)
  const [wallColor, setWallColor] = useState('grey')
  const [animating, setAnimating] = useState(false)

  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (startGame) {
      const frameRate = setInterval(() => {
        setFrame(frame + 1)
      }, gameSpeed)
      return () => clearInterval(frameRate)
    }
  }, [frame, startGame, gameSpeed])

  const resetGame = () => {
    setScore(0)
    setBirdY(game.bird.startY)
    setWallX(game.background.width)
    setWallPosition(randomNumber(-550, -100))
    setWall2X(game.background.width + game.background.width / 2)
    setWall2Position(randomNumber(-550, -100))
    setGameSpeed(3)
    setWallColor('grey')

    setGameOver(false)
    setStartGame(true)
  }

  // Animate bird
  const animateBird = (startY: number, endY: number, duration: number) => {
    if (startGame) {
      setAnimating(true)
      const startTime = performance.now()

      const animate = () => {
        const currentTime = performance.now()
        const elapsedTime = currentTime - startTime
        if (elapsedTime < duration) {
          const position = easeOutCubic(elapsedTime / duration)
          const newY = Math.floor(startY + (endY - startY) * position)
          setBirdY(newY)
          requestAnimationFrame(animate)
        }
        else {
          setBirdY(endY)
          setTimeout(() => setAnimating(false), 50)
        }
      }

      requestAnimationFrame(animate)
    }
  }

  const handleMouseClick = () => {
    const endY = birdY - 200 < 0 ? 0 : birdY - 200
    animateBird(birdY, endY, 700)
  }

  // Bird gravity
  useEffect(() => {
    if (startGame && !animating) {
      const flyInterval = setInterval(() => {
        if (birdY <= game.background.height - game.bird.height)
          setBirdY(birdY + 1)
      }, 2)

      return () => clearInterval(flyInterval)
    }
  }, [birdY, animating])

  // Update wall's x position
  useEffect(() => {
    if (startGame) {
      const wallInterval = setInterval(() => {
        const wallSpeed = 2

        if (wallX < -game.walls.width) {
          setWallX(game.background.width + game.walls.width * 2)
          setWallPosition(randomNumber(-550, -100))
        }
        else {
          setWallX(wallX - wallSpeed)
        }

        if (wall2X < -game.walls.width) {
          setWall2X(game.background.width + game.walls.width * 2)
          setWall2Position(randomNumber(-550, -100))
        }
        else {
          setWall2X(wall2X - wallSpeed)
        }
      }, 2)
      return () => clearInterval(wallInterval)
    }
  }, [frame, startGame])

  // Update score
  useEffect(() => {
    if (wallX - 200 === game.bird.startX || wall2X - 200 === game.bird.startX)
      setScore(prevScore => prevScore + 1)

    if (score > 4) {
      setGameSpeed(3)
      setWallColor('darkgrey')
    }
    if (score > 9) {
      setGameSpeed(2)
      setWallColor('black')
    }
  }, [frame])

  // Check for collision
  useEffect(() => {
    if (
      (
        (birdY < wallPosition + game.walls.height - game.collisionBuffer || birdY + game.bird.height > wallPosition + game.walls.height + game.walls.gap + game.collisionBuffer)
                && (game.bird.startX + game.bird.width > wallX - 200 + game.collisionBuffer && game.bird.startX < wallX - 200 + game.walls.width - game.collisionBuffer)
      )
            || (
              (birdY < wall2Position + game.walls.height - game.collisionBuffer || birdY + game.bird.height > wall2Position + game.walls.height + game.walls.gap + game.collisionBuffer)
                && (game.bird.startX + game.bird.width > wall2X - 200 + game.collisionBuffer && game.bird.startX < wall2X - 200 + game.walls.width - game.collisionBuffer)
            )
    ) {
      setGameOver(true)
      setStartGame(false)
    }
  }, [birdY, wallX, wall2X, wallPosition, wall2Position])

  // Draw canvas elements
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Background
        ctx.fillStyle = game.background.color
        ctx.fillRect(0, 0, game.background.width, game.background.height)

        ctx.fillStyle = 'blue'
        ctx.fillRect(0, 200, game.background.width, game.background.height)

        // Bird
        ctx.fillStyle = game.bird.color
        ctx.beginPath()
        ctx.arc(game.bird.startX + game.bird.radius, birdY + game.bird.radius, game.bird.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()

        // Walls
        ctx.fillStyle = wallColor
        ctx.fillRect(wallX - 200, wallPosition, game.walls.width, game.walls.height)

        ctx.fillStyle = wallColor
        ctx.fillRect(wallX - 200, wallPosition + game.walls.height + game.walls.gap, game.walls.width, game.walls.height)

        ctx.fillStyle = wallColor
        ctx.fillRect(wall2X - 200, wall2Position, game.walls.width, game.walls.height)

        ctx.fillStyle = wallColor
        ctx.fillRect(wall2X - 200, wall2Position + game.walls.height + game.walls.gap, game.walls.width, game.walls.height)

        // score
        ctx.font = '25px Arial'
        ctx.fillStyle = 'black'
        ctx.textAlign = 'left'

        // Add text to the canvas
        ctx.fillText(`score: ${score}`, 70, 40)
      }
    }
  }, [frame])

  // Render the canvas element
  return (
    <>
      <div className="game">
        <canvas onClick={handleMouseClick} ref={canvasRef} width={game.background.width} height={game.background.height}></canvas>

        {!startGame && !gameOver && (
          <div className="__start">
            <h2>Flappy bird game</h2>
            <button className="button" onClick={() => setStartGame(true)}>Start Game</button>
          </div>
        )}

        {gameOver && (
          <div className="__gameover">
            <h2>game over</h2>
            <p>{`You got ${score} ${score === 1 ? 'point' : 'points'}`}</p>
            <button className="button" onClick={resetGame}>Try again</button>
          </div>
        )}
      </div>
    </>
  )
}
