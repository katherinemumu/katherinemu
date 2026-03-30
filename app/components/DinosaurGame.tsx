import { useEffect, useState } from "react";

function Dino({ playerY }: { playerY: number }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: playerY,
        left: 100,
        width: 40,
        height: 40,
        background: "green",
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
        background: "red",
      }}
    />
  );
}

export default function DinosaurGame() {
  const [velocity, setVelocity] = useState(0);
  const gravity = -0.5;
  const [playerY, setPlayerY] = useState(15);
  const [obstacles, setObstacles] = useState([{ id: 1, x: 400 }]);
  const obstacleSpeed = -5;

  // game loop for dino movement
  useEffect(() => {
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
    const interval = setInterval(() => {
      setObstacles((prev) => [...prev, { id: Date.now(), x: 400 }]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // keypress
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space" && playerY === 15) {
        console.log("jump!");
        setVelocity(10);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playerY]);

  return (
    <div>
      <Dino playerY={playerY} />
      {obstacles.map((obstacle) => (
        <Obstacle key={obstacle.id} obstacleX={obstacle.x} />
      ))}
    </div>
  );
}
