import { useEffect, useState } from "react";

const HIGH_SCORE_KEY = "duckgame-high-score";

function readHighScore() {
  try {
    const saved = Number(window.localStorage.getItem(HIGH_SCORE_KEY));
    return Number.isSafeInteger(saved) && saved >= 0 ? saved : 0;
  } catch {
    return 0;
  }
}

type GameStatus = "paused" | "running" | "gameOver";

function Duck({ playerY }: { playerY: number }) {
  return (
    <svg
      aria-label="Marshmallow pixel duck"
      role="img"
      viewBox="0 0 24 24"
      width="40"
      height="40"
      shapeRendering="crispEdges"
      style={{ position: "absolute", bottom: playerY, left: 100 }}
    >
      <path
        fill="#000"
        d="M9 1h7v1h3v2h2v4h1v1h2v3h-3v6h-1v2h-2v2h-3v2h-3v-2H8v2H5v-2H3v-2H1v-3H0v-5h1V9h2V8h2V5h1V3h3z"
      />
      <path
        fill="#fff"
        d="M9 2h7v1h3v2h1v5h3v1h-3v7h-1v2h-2v1H4v-1H2v-3H1v-5h1v-2h2V9h2V5h1V4h2z"
      />
      <path
        fill="#000"
        d="M16 6h2v3h-2zM14 11h1v1h-1zM16 10h1v1h-1zM4 14h1v2h2v1h2v-1h1v-2h1v3h-1v1H6v-1H4z"
      />
    </svg>
  );
}

type ObstacleKind = "grass" | "rock";

const obstacleSizes = {
  grass: { width: 24, height: 28 },
  rock: { width: 28, height: 20 },
};

function Obstacle({
  obstacleX,
  kind,
}: {
  obstacleX: number;
  kind: ObstacleKind;
}) {
  const { width, height } = obstacleSizes[kind];
  if (obstacleX < -width) return null;

  return (
    <svg
      aria-label={kind === "grass" ? "Grass obstacle" : "Rock obstacle"}
      role="img"
      viewBox={kind === "grass" ? "0 0 12 14" : "0 0 14 10"}
      width={width}
      height={height}
      shapeRendering="crispEdges"
      style={{ position: "absolute", bottom: 15, left: obstacleX }}
    >
      {kind === "grass" ? (
        <>
          <path
            fill="#000"
            d="M6 0h1v3H6v5H5v6H4V9H3V6H2V4H1V3h2v2h1v3h1V3h1zM8 14H6v-4h1V7h1V5h2V4h1v2H9v3H8zM2 14v-3H1V9H0V8h2v2h1v4zM9 14v-3h1V9h2v2h-1v3z"
          />
        </>
      ) : (
        <>
          <path fill="#000" d="M5 0h4v1h2v2h1v2h1v2h1v3H0V6h1V4h2V2h2z" />
          <path fill="#fff" d="M5 1h4v1h1v2h1v2h1v1h1v2H1V6h1V5h2V3h1z" />
          <path fill="#000" d="M6 3h1v1H6zM9 6h1v1H9zM4 7h1v2H4z" />
        </>
      )}
    </svg>
  );
}

function isColliding({
  playerY,
  obstacleX,
  kind,
}: {
  playerY: number;
  obstacleX: number;
  kind: ObstacleKind;
}) {
  const duckLeft = 100;
  const duckRight = duckLeft + 40;
  const duckBottom = playerY;
  const duckTop = duckBottom + 40;

  const obstacleLeft = obstacleX;
  const obstacleRight = obstacleLeft + obstacleSizes[kind].width;
  const obstacleBottom = 15;
  const obstacleTop = obstacleBottom + obstacleSizes[kind].height;

  const horizontallyOverlapping =
    duckRight > obstacleLeft && duckLeft < obstacleRight;

  const verticallyOverlapping =
    duckTop > obstacleBottom && duckBottom < obstacleTop;

  return horizontallyOverlapping && verticallyOverlapping;
}

export default function DuckGame({ isInFocus }: { isInFocus: boolean }) {
  const [velocity, setVelocity] = useState(0);
  const gravity = -0.5;
  const [playerY, setPlayerY] = useState(15);
  const [obstacles, setObstacles] = useState<
    { id: number; x: number; kind: ObstacleKind }[]
  >([{ id: 1, x: 200, kind: "grass" }]);
  const obstacleSpeed = -10; // bigger abs value is faster
  const [status, setStatus] = useState<GameStatus>("paused");

  const [score, setScore] = useState(0);
  const [savedHighScore, setSavedHighScore] = useState(0);
  const highScore = Math.max(score, savedHighScore);

  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      setSavedHighScore(readHighScore()),
    );
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (highScore === 0) return;
    try {
      window.localStorage.setItem(
        HIGH_SCORE_KEY,
        String(Math.max(highScore, readHighScore())),
      );
    } catch {
      // The game still tracks the best score this session if storage is unavailable.
    }
  }, [highScore]);

  const isRunning = status === "running";

  // If the dialog loses focus, pause the game.
  // But focusing the dialog again does NOT automatically resume it.
  useEffect(() => {
    if (!isInFocus && status === "running") {
      setStatus("paused");
    }
  }, [isInFocus, status]);

  // game loop for duck movement
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

      const cleared = obstacles.filter((obstacle) => {
        const right = obstacle.x + obstacleSizes[obstacle.kind].width;
        return right > 100 && right + obstacleSpeed <= 100;
      }).length;
      if (cleared > 0) setScore((previous) => previous + cleared);
      setObstacles(
        movedObstaclces.filter(
          (obstacle) => obstacle.x + obstacleSizes[obstacle.kind].width >= 0,
        ),
      );
    }, 16);

    return () => clearInterval(interval);
  });

  // game loop for obstacle adding
  useEffect(() => {
    if (!isRunning) return;

    let timeout: NodeJS.Timeout;

    const spawnObstacle = () => {
      setObstacles((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: 350,
          kind: Math.random() < 0.5 ? "grass" : "rock",
        },
      ]);

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
        setVelocity(7);
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
        kind: obstacle.kind,
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
    setSavedHighScore(highScore);
    setScore(0);
    setVelocity(0);
    setPlayerY(15);
    setObstacles([{ id: 1, x: 400, kind: "rock" }]);
    setStatus("running");
  };

  return (
    <div className="game-stage">
      <div className="game-scoreboard" aria-label="Game scores">
        <span>
          score <strong>{String(score).padStart(3, "0")}</strong>
        </span>
        <span>
          high score <strong>{String(highScore).padStart(3, "0")}</strong>
        </span>
      </div>
      <Duck playerY={playerY} />
      {obstacles.map((obstacle) => (
        <Obstacle
          key={obstacle.id}
          obstacleX={obstacle.x}
          kind={obstacle.kind}
        />
      ))}

      {status === "paused" && (
        <div className="dialog-overlay">
          <h1 className="mb-4 text-2xl">duck walk</h1>

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
          <h1 className="mb-4 text-2xl">game over</h1>

          <button
            className="border border-black px-4 py-2"
            onClick={replayGame}
          >
            <div className="text">play again</div>
          </button>
          <p className="game-hint">press space to jump</p>
        </div>
      )}
    </div>
  );
}
