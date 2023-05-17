import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [mario, setMario] = useState({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    dir: "right",
    isMoving: false,
    isJump: false,
  });

  const handleKeyDown = (e) => {
    e.preventDefault();
    console.log(e.keyCode);

    if (e.keyCode === 38) {
      setMario((state) => {
        return {
          ...state,
          isJump: true,
        };
      });
    }

    if (e.keyCode === 38 && e.keyCode === 39) {
      console.log("Both keys pressed");
      setMario((state) => {
        return {
          ...state,
          isMoving: true,
          isJump: true,
        };
      });
    }
    if (e.keyCode === 39) {
      setMario((state) => {
        return {
          ...state,
          vx: state.vx + 20,
          x: state.x + 10,
          isMoving: true,
          dir: "right",
        };
      });
    }

    if (e.keyCode === 37) {
      setMario((state) => {
        return {
          ...state,
          x: state.x - 10,
          isMoving: true,
          dir: "left",
        };
      });
    }
  };

  const handleKeyUp = (e) => {
    e.preventDefault();
    // if (e.keyCode === 38) {
    //   setMario((state) => {
    //     return {
    //       ...state,
    //       y: 0,
    //     };
    //   });
    // }

    return setMario((state) => {
      return {
        ...state,
        isMoving: false,
      };
    });
  };

  const animateJump = () => {
    const jumpheight = 300;
    const jumpDuration = 1000;
    const fps = 60; // frames per second
    const interval = 1000 / fps; // interval between frames in ms
    const totalFrames = jumpDuration / interval;

    let frame = 0;
    let startY = mario.y;
    let startX = mario.x;

    const jumpInterval = setInterval(() => {
      const progress = frame / totalFrames;
      if (progress >= 1) {
        clearInterval(jumpInterval);
        return setMario((state) => {
          return {
            ...state,
            isJump: false,
            y: 0,
          };
        });
      }

      const newY = jumpheight * 4 * progress * (1 - progress);
      const newX = mario.dir === "right" ? 80 * progress : -80 * progress;

      setMario((state) => {
        return {
          ...state,
          x: startX + newX,
          y: startY + newY,
        };
      });

      frame++;
    }, interval);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (mario.isJump) {
      animateJump();
    }
  }, [mario.isJump]);

  return (
    <div className="sample">
      <div className="ground"></div>
      <img
        src={`${
          mario.y > 0 ? "jump" : mario.isMoving !== true ? "stand" : "walk"
        }_${mario.dir}.gif`}
        alt=""
        style={{
          left: 100 + Math.round(mario.x),
          bottom: 78 + mario.y,
          transition: "all 0.5s ease-out",
        }}
      />
    </div>
  );
}

export default App;
