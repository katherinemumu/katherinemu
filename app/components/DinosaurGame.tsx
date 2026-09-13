import { useEffect, useState } from "react";

type GameStatus = "paused" | "running" | "gameOver";

function Dino({ playerY }: { playerY: number }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: playerY,
        left: 100,
        width: 40,
        height: 40,
        background: "#856c9b",
        border: "2px solid #503d64",
      }}
    />
  );
}

function Obstacle({ obstacleX }: { obstacleX: number }) {
  if (obstacleX < 0) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: 15,
        left: obstacleX,
        width: 20,
        height: 40,
        background: "#bc5e87",
        border: "2px solid #503d64",
      }}
    />
  );
}

function isColliding({
  playerY,
  obstacleX,
}: {
  playerY: number;
  obstacleX: number;
}) {
  const dinoLeft = 100;
  const dinoRight = dinoLeft + 40;
  const dinoBottom = playerY;
  const dinoTop = dinoBottom + 40;

  const obstacleLeft = obstacleX;
  const obstacleRight = obstacleLeft + 20;
  const obstacleBottom = 15;
  const obstacleTop = obstacleBottom + 40;

  const horizontallyOverlapping =
    dinoRight > obstacleLeft && dinoLeft < obstacleRight;

  const verticallyOverlapping =
    dinoTop > obstacleBottom && dinoBottom < obstacleTop;

  return horizontallyOverlapping && verticallyOverlapping;
}

export default function DinosaurGame({ isInFocus }: { isInFocus: boolean }) {
  const [velocity, setVelocity] = useState(0);
  const gravity = -0.5;
  const [playerY, setPlayerY] = useState(15);
  const [obstacles, setObstacles] = useState([{ id: 1, x: 200 }]);
  const obstacleSpeed = -10; // bigger abs value is faster
  const [status, setStatus] = useState<GameStatus>("paused");

  const isRunning = status === "running";

  // If the dialog loses focus, pause the game.
  // But focusing the dialog again does NOT automatically resume it.
  useEffect(() => {
    if (!isInFocus && status === "running") {
      setStatus("paused");
    }
  }, [isInFocus, status]);

  // game loop for dino movement
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setPlayerY((y) => {
        if (velocity > 0) {
        }
        let newY = y + velocity;
        if (newY <= 15) {
          newY = 15;
          setVelocity(0);
        }
        return newY;
      });

      setVelocity((v) => v + gravity);
    }, 16);

    return () => clearInterval(interval);
  });

  // game loop for obstacle movement
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      const movedObstaclces = obstacles.map((obstacle) => ({
        ...obstacle,
        x: obstacle.x + obstacleSpeed,
      }));

      setObstacles(movedObstaclces);
    }, 16);

    return () => clearInterval(interval);
  });

  // game loop for obstacle adding
  useEffect(() => {
    if (!isRunning) return;

    let timeout: NodeJS.Timeout;

    const spawnObstacle = () => {
      setObstacles((prev) => [...prev, { id: Date.now(), x: 350 }]);

      const delay = Math.random() * 1500 + 1000;
      // random between 1000ms and 2500ms

      timeout = setTimeout(spawnObstacle, delay);
    };

    spawnObstacle();

    return () => clearTimeout(timeout);
  }, [isRunning]);

  // keypress
  useEffect(() => {
    if (!isRunning) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && playerY === 15) {
        e.preventDefault();
        setVelocity(10);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playerY, isRunning]);

  // for obstacle detection
  useEffect(() => {
    if (!isRunning) return;

    const hasCollision = obstacles.some((obstacle) =>
      isColliding({
        playerY,
        obstacleX: obstacle.x,
      }),
    );

    if (hasCollision) {
      setStatus("gameOver");
    }
  }, [isRunning, playerY, obstacles]);

  const resumeGame = () => {
    setStatus("running");
  };

  const replayGame = () => {
    setVelocity(0);
    setPlayerY(15);
    setObstacles([{ id: 1, x: 400 }]);
    setStatus("running");
  };

  return (
    <div className="game-stage">
      <Dino playerY={playerY} />
      {obstacles.map((obstacle) => (
        <Obstacle key={obstacle.id} obstacleX={obstacle.x} />
      ))}

      {status === "paused" && (
        <div className="dialog-overlay">
          <h1 className="mb-4 text-2xl">A tiny game break</h1>

          <button
            className="border border-black px-4 py-2"
            onClick={resumeGame}
          >
            <div>Play / resume</div>
          </button>
          <p className="game-hint">press space to jump</p>
        </div>
      )}

      {status === "gameOver" && (
        <div className="dialog-overlay">
          <h1 className="mb-4 text-2xl">Game Over</h1>

          <button
            className="border border-black px-4 py-2"
            onClick={replayGame}
          >
            <div className="text">Play again</div>
          </button>
          <p className="game-hint">press space to jump</p>
        </div>
      )}
    </div>
  );
}
