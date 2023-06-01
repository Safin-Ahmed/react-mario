import { useEffect } from "react";

const useMusic = (music) => {
  useEffect(() => {
    // Create a new audio object
    const audio = new Audio(music);

    // Set the audio to loop indefinitely
    audio.loop = true;

    // play the audio
    const playAudio = () => {
      setTimeout(() => {
        audio.play();
      }, 100);
      document.removeEventListener("keydown", playAudio);
    };

    document.addEventListener("keydown", playAudio);

    return () => {
      // cleanup: pause and unload the audio when the component unmounts
      audio.pause();
      audio.src = "";
    };
  }, []);
};

export default useMusic;
