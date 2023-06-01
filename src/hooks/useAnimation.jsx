const useAnimation = (mario, setMario) => {
  const moveMario = () => {
    setMario((state) => ({
      ...state,
      x: state.dir === "right" ? state.x + 10 : state.x - 10,
    }));
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

  return {
    moveMario,
    animateJump,
  };
};

export default useAnimation;
