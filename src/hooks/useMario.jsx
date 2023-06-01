import { useEffect, useState } from "react";
import useAnimation from "./useAnimation";

const useMario = () => {
  const [mario, setMario] = useState({
    x: 0,
    y: 0,
    dir: "right",
    isMoving: false,
    isJump: false,
  });

  const { animateJump, moveMario } = useAnimation(mario, setMario);

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

    if (e.keyCode === 39) {
      setMario((state) => {
        return {
          ...state,
          isMoving: true,
          dir: "right",
        };
      });
    }

    if (e.keyCode === 37) {
      setMario((state) => {
        return {
          ...state,
          isMoving: true,
          dir: "left",
        };
      });
    }
  };

  const handleKeyUp = (e) => {
    e.preventDefault();
    if (e.keyCode === 38) {
      setMario((state) => {
        return {
          ...state,
          isJump: false,
        };
      });
    }

    if (e.keyCode === 37 || e.keyCode === 39) {
      setMario((state) => {
        return {
          ...state,
          isMoving: false,
        };
      });
    }
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

  useEffect(() => {
    let moveInterval;

    if (mario.isMoving) {
      moveInterval = setInterval(moveMario, 100);
    } else {
      clearInterval(moveInterval);
    }

    return () => {
      clearInterval(moveInterval);
    };
  }, [mario.isMoving]);

  return {
    mario,
    setMario,
  };
};

export default useMario;
